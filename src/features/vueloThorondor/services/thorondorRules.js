import {
  THORONDOR_ALERT_TYPES,
  THORONDOR_HEARTBEAT_CRITICAL_MINUTES,
  THORONDOR_HEARTBEAT_WARNING_MINUTES
} from "@/features/vueloThorondor/data/thorondorDefaults";

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getRecentSnapshots(snapshots, durationMinutes) {
  const cutoff = Date.now() - (durationMinutes * 60000);
  return (snapshots || []).filter((item) => new Date(item.timestamp).getTime() >= cutoff);
}

export function evaluateThorondorRules({ agent, rules, snapshots, securityEvents }) {
  const alerts = [];
  const activeRules = (rules || []).filter((rule) => rule.enabled && (rule.scope === "all" || rule.scope === agent.id));
  const recentEvents = securityEvents || [];

  activeRules.forEach((rule) => {
    if (rule.type === "cpu") {
      const recent = getRecentSnapshots(snapshots, rule.durationMinutes);
      const avg = average(recent.map((item) => item.cpuTotal || 0));
      if (avg >= rule.threshold && recent.length) {
        alerts.push(buildAlert(agent, rule, `CPU media ${Math.round(avg)}% durante ${rule.durationMinutes} min.`));
      }
    }

    if (rule.type === "ram") {
      const recent = getRecentSnapshots(snapshots, rule.durationMinutes);
      const avg = average(recent.map((item) => item.memoryPercent || 0));
      if (avg >= rule.threshold && recent.length) {
        alerts.push(buildAlert(agent, rule, `RAM media ${Math.round(avg)}% durante ${rule.durationMinutes} min.`));
      }
    }

    if (rule.type === "disk") {
      const recent = getRecentSnapshots(snapshots, rule.durationMinutes);
      const maxDisk = Math.max(...recent.map((item) => item.diskPercent || 0), 0);
      if (maxDisk >= rule.threshold && recent.length) {
        alerts.push(buildAlert(agent, rule, `Disco detectado al ${Math.round(maxDisk)}%.`));
      }
    }

    if (rule.type === "failedLogins") {
      const cutoff = Date.now() - (rule.durationMinutes * 60000);
      const matches = recentEvents.filter((event) => {
        return event.kind === "failed_login" && new Date(event.timestamp).getTime() >= cutoff;
      });
      if (matches.length >= rule.threshold) {
        alerts.push(buildAlert(agent, rule, `${matches.length} logins fallidos en ${rule.durationMinutes} min.`));
      }
    }

    if (rule.type === "criticalFileChange") {
      const match = recentEvents.find((event) => event.kind === "critical_file_change");
      if (match) {
        alerts.push(buildAlert(agent, rule, `Cambio detectado en ${match.file || "archivo critico"}.`));
      }
    }

    if (rule.type === "unknownLoginIp") {
      const successful = recentEvents.filter((event) => event.kind === "successful_login" && event.sourceIp && event.sourceIp !== "sin-ip");
      const knownIps = new Set(successful.slice(0, -1).map((event) => event.sourceIp));
      const latest = successful[successful.length - 1];
      if (latest && !knownIps.has(latest.sourceIp)) {
        alerts.push(buildAlert(agent, rule, `Login exitoso desde IP no vista antes: ${latest.sourceIp}.`));
      }
    }

    if (rule.type === "heartbeat") {
      const lastSeen = agent?.lastHeartbeatAt ? new Date(agent.lastHeartbeatAt).getTime() : 0;
      const minutes = lastSeen ? Math.floor((Date.now() - lastSeen) / 60000) : rule.threshold + 1;
      if (!lastSeen || minutes >= rule.threshold) {
        alerts.push(buildAlert(agent, rule, `Sin heartbeat desde hace ${minutes} min.`));
      }
    }

    if (rule.type === "sudoUnauthorized") {
      const unauthorized = recentEvents.find((event) => {
        return event.kind === "sudo_command" && !rule.allowedUsers?.includes(event.user);
      });
      if (unauthorized) {
        alerts.push(buildAlert(agent, rule, `Comando sudo por usuario no autorizado: ${unauthorized.user}.`));
      }
    }

    if (rule.type === "newUser") {
      const entry = recentEvents.find((event) => event.kind === "new_user");
      if (entry) {
        alerts.push(buildAlert(agent, rule, `Nuevo usuario o grupo detectado: ${entry.subject || "sin detalle"}.`));
      }
    }

    if (rule.type === "networkExposure") {
      const snapshot = snapshots?.[snapshots.length - 1];
      const ports = snapshot?.openPorts || [];
      const suspicious = ports.find((item) => rule.sensitivePorts?.includes(Number(item.port)));
      if (suspicious) {
        alerts.push(buildAlert(agent, rule, `Puerto sensible en escucha: ${suspicious.port}/${suspicious.proto || "tcp"}.`));
      }
    }
  });

  return dedupeAlerts(alerts);
}

export function deriveThorondorAgentStatus(agent) {
  if (!agent?.lastHeartbeatAt) {
    return {
      label: "Sin datos",
      color: "warning",
      note: "El agente aun no ha enviado heartbeat."
    };
  }

  const diffMinutes = (Date.now() - new Date(agent.lastHeartbeatAt).getTime()) / 60000;

  if (diffMinutes > THORONDOR_HEARTBEAT_CRITICAL_MINUTES) {
    return {
      label: "Desconectado",
      color: "danger",
      note: `Sin heartbeat desde hace mas de ${THORONDOR_HEARTBEAT_CRITICAL_MINUTES} min.`
    };
  }

  if (diffMinutes > THORONDOR_HEARTBEAT_WARNING_MINUTES) {
    return {
      label: "Sin datos recientes",
      color: "warning",
      note: `Heartbeat mas antiguo que ${THORONDOR_HEARTBEAT_WARNING_MINUTES} min.`
    };
  }

  return {
    label: "Activo",
    color: "success",
    note: "El agente responde dentro del margen esperado."
  };
}

function buildAlert(agent, rule, description) {
  return {
    id: `${rule.id}-${agent.id}-${slugify(description)}`,
    agentId: agent.id,
    ruleId: rule.id,
    type: rule.type,
    typeLabel: THORONDOR_ALERT_TYPES[rule.type] || rule.type,
    name: rule.name,
    description,
    status: "active",
    createdAt: new Date().toISOString()
  };
}

function dedupeAlerts(alerts) {
  const map = new Map();
  alerts.forEach((alert) => {
    const key = `${alert.agentId}-${alert.ruleId}-${alert.description}`;
    if (!map.has(key)) {
      map.set(key, alert);
    }
  });
  return Array.from(map.values());
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
