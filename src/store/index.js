import { createStore } from 'vuex'
import {
  THORONDOR_CONNECTION_LIMIT,
  THORONDOR_HISTORY_LIMIT,
  THORONDOR_IDB_EVENT_LIMIT,
  THORONDOR_IDB_LOG_LIMIT,
  THORONDOR_IDB_SNAPSHOT_LIMIT,
  THORONDOR_LOG_LIMIT,
  THORONDOR_RETENTION_DAYS,
  THORONDOR_SECURITY_LIMIT,
  THORONDOR_SWEEP_INTERVAL_MS,
  buildThorondorAgentDraft,
  buildDefaultThorondorRuleSet
} from '@/features/vueloThorondor/data/thorondorDefaults'
import {
  STORE_NAMES,
  deleteByIndex,
  deleteOne,
  loadThorondorPersistence,
  openThorondorDb,
  putMany,
  putOne,
  setMeta,
  sweepThorondorPersistence
} from '@/features/vueloThorondor/services/thorondorIndexedDb'
import {
  buildThorondorRequestRules,
  fetchThorondorHealth,
  fetchThorondorTelemetry
} from '@/features/vueloThorondor/services/thorondorApi'
import {
  deriveThorondorAgentStatus,
  evaluateThorondorRules
} from '@/features/vueloThorondor/services/thorondorRules'

const BILBO_STORAGE_KEY = 'el-anillo-bilbo-progress'

function loadBilboAcademyState() {
  if (typeof window === 'undefined') {
    return { levels: {} }
  }

  try {
    const raw = window.localStorage.getItem(BILBO_STORAGE_KEY)
    if (!raw) return { levels: {} }

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || typeof parsed.levels !== 'object') {
      return { levels: {} }
    }

    return {
      levels: parsed.levels
    }
  } catch (error) {
    return { levels: {} }
  }
}

function persistBilboAcademyState(state) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(BILBO_STORAGE_KEY, JSON.stringify(state.bilboAcademy))
  } catch (error) {
    // Ignore persistence failures to keep the UI usable.
  }
}

function createThorondorState() {
  return {
    initialized: false,
    bootstrapping: false,
    retentionDays: THORONDOR_RETENTION_DAYS,
    lastSweepAt: null,
    agents: [],
    rules: buildDefaultThorondorRuleSet(),
    alerts: [],
    selectedAgentId: null,
    snapshotsByAgent: {},
    logsByAgent: {},
    securityEventsByAgent: {},
    connectionHistoryByAgent: {},
    requestRulesByAgent: {},
    generatorDraft: buildThorondorAgentDraft(),
    errors: [],
    lastPollAt: null
  }
}

function limitItems(items, limit) {
  return items.slice(Math.max(items.length - limit, 0))
}

function mapByAgent(items, keyName = 'agentId') {
  return (items || []).reduce((acc, item) => {
    const agentId = item?.[keyName]
    if (!agentId) return acc
    if (!acc[agentId]) acc[agentId] = []
    acc[agentId].push(item)
    return acc
  }, {})
}

function toSummarySnapshot(agentId, telemetry) {
  const metrics = telemetry?.metrics || {}
  const system = telemetry?.system || {}
  const disks = Array.isArray(metrics.disks) ? metrics.disks : []
  const topDisk = disks.reduce((max, item) => Math.max(max, Number(item.percent) || 0), 0)

  return {
    id: `${agentId}-${telemetry.heartbeat || new Date().toISOString()}`,
    agentId,
    timestamp: telemetry.heartbeat || new Date().toISOString(),
    hostname: system.hostname || telemetry?.agent?.hostLabel || '-',
    localIp: system.localIp || '-',
    distro: telemetry?.agent?.distro || '-',
    kernel: system.kernel || '-',
    uptimeSeconds: system.uptimeSeconds || 0,
    connectedUsers: system.connectedUsers || [],
    cpuTotal: Number(metrics.cpuTotal) || 0,
    cpuPerCore: metrics.cpuPerCore || [],
    memoryPercent: Number(metrics.memoryPercent) || 0,
    memoryUsed: Number(metrics.memoryUsed) || 0,
    memoryTotal: Number(metrics.memoryTotal) || 0,
    swapPercent: Number(metrics.swapPercent) || 0,
    disks,
    diskPercent: topDisk,
    processes: metrics.processes || [],
    interfaces: metrics.interfaces || [],
    temperatures: metrics.temperatures || [],
    openPorts: metrics.openPorts || [],
    loadAverage: system.loadAverage || []
  }
}

function flattenLogs(agentId, telemetry) {
  const logs = telemetry?.logs || {}
  const entries = []
  const timestamp = telemetry?.heartbeat || new Date().toISOString()

  const pushLines = (source, lines, level = 'INFO') => {
    ;(lines || []).forEach((line, index) => {
      if (!line) return
      entries.push({
        id: `${agentId}-${source}-${timestamp}-${index}-${hashCode(line)}`,
        agentId,
        source,
        level: inferLogLevel(line, level),
        message: line,
        timestamp
      })
    })
  }

  pushLines('syslog', logs.syslogTail)
  pushLines('journal', logs.journalTail)
  pushLines('kernel', logs.kernelErrors, 'ERROR')
  ;(logs.customLogs || []).forEach((customLog) => pushLines('custom', customLog.lines))

  return limitItems(entries, THORONDOR_LOG_LIMIT)
}

function flattenSecurityEvents(agentId, telemetry) {
  return limitItems((telemetry?.security?.events || []).map((event, index) => ({
    id: `${agentId}-event-${event.timestamp || Date.now()}-${index}-${hashCode(JSON.stringify(event))}`,
    agentId,
    timestamp: event.timestamp || telemetry?.heartbeat || new Date().toISOString(),
    ...event
  })), THORONDOR_SECURITY_LIMIT)
}

function inferLogLevel(line, fallback) {
  const lower = String(line || '').toLowerCase()
  if (lower.includes('critical')) return 'CRITICAL'
  if (lower.includes('error')) return 'ERROR'
  if (lower.includes('warn')) return 'WARNING'
  return fallback
}

function hashCode(text) {
  return Array.from(String(text || '')).reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0)
}

function normalizeAgentRecord(agent) {
  return {
    ...agent,
    updatedAt: new Date().toISOString(),
    requestRules: buildThorondorRequestRules(agent)
  }
}

export default createStore({
  state: {
    bilboAcademy: loadBilboAcademyState(),
    thorondor: createThorondorState()
  },

  getters: {
    thorondorAgents(state) {
      return state.thorondor.agents
    },

    thorondorSelectedAgent(state) {
      return state.thorondor.agents.find((item) => item.id === state.thorondor.selectedAgentId) || null
    },

    thorondorSnapshots(state) {
      return state.thorondor.snapshotsByAgent
    },

    thorondorDashboardCards(state) {
      return state.thorondor.agents.map((agent) => {
        const snapshots = state.thorondor.snapshotsByAgent[agent.id] || []
        const latest = snapshots[snapshots.length - 1] || null
        const status = deriveThorondorAgentStatus(agent)
        const alerts = state.thorondor.alerts.filter((alert) => alert.agentId === agent.id && alert.status === 'active')

        return {
          ...agent,
          latestSnapshot: latest,
          status,
          alertCount: alerts.length
        }
      })
    },

    thorondorSecurityEventsFlat(state) {
      return Object.values(state.thorondor.securityEventsByAgent).flat()
    },

    thorondorLogsFlat(state) {
      return Object.values(state.thorondor.logsByAgent).flat()
    }
  },

  mutations: {
    submitBilboAnswer(state, payload) {
      const { levelId, questionId, selectedIndex, isCorrect } = payload

      if (!state.bilboAcademy.levels[levelId]) {
        state.bilboAcademy.levels[levelId] = {
          answers: {},
          updatedAt: null
        }
      }

      const levelState = state.bilboAcademy.levels[levelId]
      if (levelState.answers[questionId]) return

      levelState.answers[questionId] = {
        selectedIndex,
        isCorrect,
        answeredAt: new Date().toISOString()
      }
      levelState.updatedAt = new Date().toISOString()

      persistBilboAcademyState(state)
    },

    resetBilboLevel(state, levelId) {
      if (state.bilboAcademy.levels[levelId]) {
        delete state.bilboAcademy.levels[levelId]
        persistBilboAcademyState(state)
      }
    },

    resetBilboCategory(state, payload) {
      const { levels, questionIds } = payload

      levels.forEach((levelId) => {
        const levelState = state.bilboAcademy.levels[levelId]
        if (!levelState || !levelState.answers) return

        questionIds.forEach((questionId) => {
          if (levelState.answers[questionId]) {
            delete levelState.answers[questionId]
          }
        })

        if (!Object.keys(levelState.answers).length) {
          delete state.bilboAcademy.levels[levelId]
        } else {
          levelState.updatedAt = new Date().toISOString()
        }
      })

      persistBilboAcademyState(state)
    },

    resetAllBilboProgress(state) {
      state.bilboAcademy = { levels: {} }
      persistBilboAcademyState(state)
    },

    setThorondorBootstrapping(state, value) {
      state.thorondor.bootstrapping = value
    },

    setThorondorLastSweepAt(state, value) {
      state.thorondor.lastSweepAt = value
    },

    hydrateThorondorState(state, payload) {
      state.thorondor.initialized = true
      state.thorondor.lastSweepAt = payload.lastSweepAt || null
      state.thorondor.agents = (payload.agents || []).map((agent) => normalizeAgentRecord(agent))
      state.thorondor.rules = payload.rules?.length ? payload.rules : buildDefaultThorondorRuleSet()
      state.thorondor.alerts = payload.alerts || []
      state.thorondor.generatorDraft = payload.generatorDraft || buildThorondorAgentDraft()
      state.thorondor.snapshotsByAgent = mapByAgent(payload.snapshots)
      state.thorondor.logsByAgent = mapByAgent(payload.logs)
      state.thorondor.securityEventsByAgent = mapByAgent(payload.events)
      state.thorondor.connectionHistoryByAgent = mapByAgent(payload.history)
      state.thorondor.requestRulesByAgent = state.thorondor.agents.reduce((acc, agent) => {
        acc[agent.id] = buildThorondorRequestRules(agent)
        return acc
      }, {})
      state.thorondor.selectedAgentId = state.thorondor.selectedAgentId || state.thorondor.agents[0]?.id || null
    },

    registerThorondorAgent(state, agent) {
      const record = normalizeAgentRecord(agent)
      const index = state.thorondor.agents.findIndex((item) => item.id === record.id)

      if (index >= 0) {
        state.thorondor.agents.splice(index, 1, {
          ...state.thorondor.agents[index],
          ...record
        })
      } else {
        state.thorondor.agents.push(record)
      }

      state.thorondor.requestRulesByAgent[record.id] = buildThorondorRequestRules(record)
      if (!state.thorondor.selectedAgentId) {
        state.thorondor.selectedAgentId = record.id
      }
    },

    removeThorondorAgent(state, agentId) {
      state.thorondor.agents = state.thorondor.agents.filter((agent) => agent.id !== agentId)
      delete state.thorondor.snapshotsByAgent[agentId]
      delete state.thorondor.logsByAgent[agentId]
      delete state.thorondor.securityEventsByAgent[agentId]
      delete state.thorondor.connectionHistoryByAgent[agentId]
      delete state.thorondor.requestRulesByAgent[agentId]
      state.thorondor.alerts = state.thorondor.alerts.filter((alert) => alert.agentId !== agentId)
      if (state.thorondor.selectedAgentId === agentId) {
        state.thorondor.selectedAgentId = state.thorondor.agents[0]?.id || null
      }
    },

    setThorondorSelectedAgent(state, agentId) {
      state.thorondor.selectedAgentId = agentId
    },

    setThorondorGeneratorDraft(state, draft) {
      state.thorondor.generatorDraft = draft
    },

    clearThorondorGeneratorDraft(state) {
      state.thorondor.generatorDraft = buildThorondorAgentDraft()
    },

    ingestThorondorTelemetry(state, payload) {
      const { agentId, telemetry } = payload
      const snapshot = toSummarySnapshot(agentId, telemetry)
      const logs = flattenLogs(agentId, telemetry)
      const events = flattenSecurityEvents(agentId, telemetry)

      if (!state.thorondor.snapshotsByAgent[agentId]) state.thorondor.snapshotsByAgent[agentId] = []
      if (!state.thorondor.logsByAgent[agentId]) state.thorondor.logsByAgent[agentId] = []
      if (!state.thorondor.securityEventsByAgent[agentId]) state.thorondor.securityEventsByAgent[agentId] = []

      state.thorondor.snapshotsByAgent[agentId].push(snapshot)
      state.thorondor.snapshotsByAgent[agentId] = limitItems(state.thorondor.snapshotsByAgent[agentId], THORONDOR_HISTORY_LIMIT)

      const existingLogs = state.thorondor.logsByAgent[agentId]
      const logMap = new Map(existingLogs.map((item) => [item.id, item]))
      logs.forEach((item) => logMap.set(item.id, item))
      state.thorondor.logsByAgent[agentId] = limitItems(Array.from(logMap.values()).sort((a, b) => a.timestamp.localeCompare(b.timestamp)), THORONDOR_LOG_LIMIT)

      const existingEvents = state.thorondor.securityEventsByAgent[agentId]
      const eventMap = new Map(existingEvents.map((item) => [item.id, item]))
      events.forEach((item) => eventMap.set(item.id, item))
      state.thorondor.securityEventsByAgent[agentId] = limitItems(Array.from(eventMap.values()).sort((a, b) => a.timestamp.localeCompare(b.timestamp)), THORONDOR_SECURITY_LIMIT)

      const agentIndex = state.thorondor.agents.findIndex((item) => item.id === agentId)
      if (agentIndex >= 0) {
        state.thorondor.agents.splice(agentIndex, 1, {
          ...state.thorondor.agents[agentIndex],
          lastHeartbeatAt: telemetry.heartbeat || new Date().toISOString(),
          lastStatus: 'ok',
          lastSnapshotSummary: {
            cpuTotal: snapshot.cpuTotal,
            memoryPercent: snapshot.memoryPercent,
            diskPercent: snapshot.diskPercent
          },
          updatedAt: new Date().toISOString()
        })
      }

      state.thorondor.lastPollAt = new Date().toISOString()
    },

    recordThorondorConnection(state, payload) {
      const historyEntry = {
        id: `${payload.agentId}-${payload.timestamp}-${payload.kind}`,
        ...payload
      }

      if (!state.thorondor.connectionHistoryByAgent[payload.agentId]) {
        state.thorondor.connectionHistoryByAgent[payload.agentId] = []
      }

      state.thorondor.connectionHistoryByAgent[payload.agentId].push(historyEntry)
      state.thorondor.connectionHistoryByAgent[payload.agentId] = limitItems(
        state.thorondor.connectionHistoryByAgent[payload.agentId],
        THORONDOR_CONNECTION_LIMIT
      )

      const agentIndex = state.thorondor.agents.findIndex((item) => item.id === payload.agentId)
      if (agentIndex >= 0) {
        state.thorondor.agents.splice(agentIndex, 1, {
          ...state.thorondor.agents[agentIndex],
          lastStatus: payload.kind === 'success' ? 'ok' : 'error',
          lastError: payload.error || null,
          updatedAt: new Date().toISOString()
        })
      }
    },

    upsertThorondorAlerts(state, alerts) {
      const map = new Map(state.thorondor.alerts.map((item) => [item.id, item]))

      alerts.forEach((alert) => {
        const existing = map.get(alert.id)
        map.set(alert.id, {
          ...(existing || {}),
          ...alert,
          status: existing?.status === 'resolved' ? 'resolved' : (existing?.status || alert.status || 'active')
        })
      })

      state.thorondor.alerts = Array.from(map.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    },

    updateThorondorRule(state, rule) {
      const index = state.thorondor.rules.findIndex((item) => item.id === rule.id)
      if (index >= 0) {
        state.thorondor.rules.splice(index, 1, {
          ...state.thorondor.rules[index],
          ...rule
        })
      } else {
        state.thorondor.rules.push(rule)
      }
    },

    removeThorondorRule(state, ruleId) {
      state.thorondor.rules = state.thorondor.rules.filter((item) => item.id !== ruleId)
    },

    setThorondorAlertStatus(state, payload) {
      const index = state.thorondor.alerts.findIndex((item) => item.id === payload.id)
      if (index >= 0) {
        state.thorondor.alerts.splice(index, 1, {
          ...state.thorondor.alerts[index],
          status: payload.status,
          reviewedAt: payload.status !== 'active' ? new Date().toISOString() : null
        })
      }
    },

    pushThorondorError(state, errorMessage) {
      state.thorondor.errors.unshift({
        id: `${Date.now()}-${Math.random()}`,
        message: errorMessage,
        timestamp: new Date().toISOString()
      })
      state.thorondor.errors = state.thorondor.errors.slice(0, 20)
    }
  },

  actions: {
    async bootstrapThorondor({ commit, state }) {
      if (state.thorondor.initialized || state.thorondor.bootstrapping) return

      commit('setThorondorBootstrapping', true)
      try {
        await openThorondorDb()
        const persisted = await loadThorondorPersistence()
        commit('hydrateThorondorState', persisted)
        const cutoff = new Date(Date.now() - (state.thorondor.retentionDays * 86400000)).toISOString()
        await sweepThorondorPersistence(cutoff)
        const sweepTime = new Date().toISOString()
        await setMeta('lastSweepAt', sweepTime)
        commit('setThorondorLastSweepAt', sweepTime)
      } catch (error) {
        commit('pushThorondorError', `No se pudo inicializar Thorondor: ${error.message}`)
        commit('hydrateThorondorState', {
          agents: [],
          snapshots: [],
          logs: [],
          events: [],
          alerts: [],
          rules: buildDefaultThorondorRuleSet(),
          history: [],
          lastSweepAt: null,
          generatorDraft: buildThorondorAgentDraft()
        })
      } finally {
        commit('setThorondorBootstrapping', false)
      }
    },

    async registerThorondorAgent({ commit, dispatch }, agent) {
      const record = {
        ...agent,
        createdAt: agent.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      commit('registerThorondorAgent', record)
      await putOne(STORE_NAMES.agents, record)
      await dispatch('persistThorondorRules')
    },

    async removeThorondorAgent({ commit }, agentId) {
      commit('removeThorondorAgent', agentId)
      await Promise.all([
        deleteOne(STORE_NAMES.agents, agentId),
        deleteByIndex(STORE_NAMES.snapshots, 'agentId', agentId),
        deleteByIndex(STORE_NAMES.logs, 'agentId', agentId),
        deleteByIndex(STORE_NAMES.events, 'agentId', agentId),
        deleteByIndex(STORE_NAMES.history, 'agentId', agentId),
        deleteByIndex(STORE_NAMES.alerts, 'agentId', agentId)
      ])
    },

    async saveThorondorGeneratorDraft({ commit }, draft) {
      commit('setThorondorGeneratorDraft', draft)
      await setMeta('generatorDraft', draft)
    },

    async clearThorondorGeneratorDraft({ commit }) {
      const draft = buildThorondorAgentDraft()
      commit('clearThorondorGeneratorDraft')
      await setMeta('generatorDraft', draft)
    },

    async pollThorondorAgents({ state, commit, dispatch }) {
      const agents = state.thorondor.agents.filter((agent) => agent.receiverUrl || agent.hostIp)

      for (const agent of agents) {
        const timestamp = new Date().toISOString()

        try {
          await fetchThorondorHealth(agent)
          const telemetry = await fetchThorondorTelemetry(agent)
          commit('ingestThorondorTelemetry', { agentId: agent.id, telemetry })
          commit('recordThorondorConnection', {
            agentId: agent.id,
            timestamp,
            kind: 'success',
            endpoint: agent.receiverUrl || agent.hostIp
          })

          const snapshots = state.thorondor.snapshotsByAgent[agent.id] || []
          const events = state.thorondor.securityEventsByAgent[agent.id] || []
          const alerts = evaluateThorondorRules({
            agent: state.thorondor.agents.find((item) => item.id === agent.id) || agent,
            rules: state.thorondor.rules,
            snapshots,
            securityEvents: events
          })
          commit('upsertThorondorAlerts', alerts)
          await dispatch('persistThorondorAgentData', agent.id)
        } catch (error) {
          commit('recordThorondorConnection', {
            agentId: agent.id,
            timestamp,
            kind: 'error',
            endpoint: agent.receiverUrl || agent.hostIp,
            error: error.message
          })
        }
      }

      await dispatch('persistThorondorAlerts')
      await dispatch('sweepThorondorData')
    },

    async persistThorondorAgentData({ state }, agentId) {
      const snapshots = state.thorondor.snapshotsByAgent[agentId] || []
      const logs = state.thorondor.logsByAgent[agentId] || []
      const events = state.thorondor.securityEventsByAgent[agentId] || []
      const history = state.thorondor.connectionHistoryByAgent[agentId] || []
      const agent = state.thorondor.agents.find((item) => item.id === agentId)

      if (agent) {
        await putOne(STORE_NAMES.agents, agent)
      }

      await Promise.all([
        putMany(STORE_NAMES.snapshots, snapshots),
        putMany(STORE_NAMES.logs, logs),
        putMany(STORE_NAMES.events, events),
        putMany(STORE_NAMES.history, history)
      ])
    },

    async persistThorondorAlerts({ state }) {
      await putMany(STORE_NAMES.alerts, state.thorondor.alerts)
    },

    async persistThorondorRules({ state }) {
      await putMany(STORE_NAMES.rules, state.thorondor.rules)
    },

    async saveThorondorRule({ commit, dispatch }, rule) {
      commit('updateThorondorRule', rule)
      await dispatch('persistThorondorRules')
    },

    async deleteThorondorRule({ commit, state, dispatch }, ruleId) {
      commit('removeThorondorRule', ruleId)
      await deleteOne(STORE_NAMES.rules, ruleId)
      await dispatch('persistThorondorRules')
      if (!state.thorondor.rules.length) {
        const defaults = buildDefaultThorondorRuleSet()
        defaults.forEach((rule) => commit('updateThorondorRule', rule))
        await dispatch('persistThorondorRules')
      }
    },

    async setThorondorAlertStatus({ commit, dispatch }, payload) {
      commit('setThorondorAlertStatus', payload)
      await dispatch('persistThorondorAlerts')
    },

    async sweepThorondorData({ state, commit }) {
      const lastSweep = state.thorondor.lastSweepAt ? new Date(state.thorondor.lastSweepAt).getTime() : 0
      if (Date.now() - lastSweep < THORONDOR_SWEEP_INTERVAL_MS) return

      const cutoff = new Date(Date.now() - (state.thorondor.retentionDays * 86400000)).toISOString()
      const agentIds = state.thorondor.agents.map((a) => a.id)

      await sweepThorondorPersistence(cutoff, agentIds, {
        snapshots: THORONDOR_IDB_SNAPSHOT_LIMIT,
        logs: THORONDOR_IDB_LOG_LIMIT,
        events: THORONDOR_IDB_EVENT_LIMIT
      })

      const sweepTime = new Date().toISOString()
      await setMeta('lastSweepAt', sweepTime)
      commit('setThorondorLastSweepAt', sweepTime)
    }
  },

  modules: {
  }
})
