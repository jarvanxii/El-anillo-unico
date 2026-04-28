import { createStore } from 'vuex'

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

export default createStore({
  state: {
    bilboAcademy: loadBilboAcademyState()
  },

  getters: {
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
    }
  },

  actions: {
  },

  modules: {
  }
})
