import { ChoicesApi } from '@/services/choices-services'
export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    getQuestChoice(state) {
      return state.data
    }
  },
  actions: {
    async fetchQuestChoice({ commit }, payload) {
      try {
        const response = await ChoicesApi().getChoicesByExamId(payload)
        commit('setQuestChoice', response.data)
      } catch (e) {
        throw e
      }
    },

    addQuestChoices({ commit }, payload) {
      commit('addQuestChoice', payload)
    },
    updateQuestChoices({ commit }, payload) {
      commit('updateQuestChoice', payload)
    },
    removeQuestChoices({ commit }, payload) {
      commit('deleteQuestChoice', payload)
    }
  },
  mutations: {
    setQuestChoice(state, payload) {
      state.data = payload
    },
    addQuestChoice(state, payload) {
      state.data.unshift(payload)
    },
    updateQuestChoice(state, payload) {
      const findIndex = state.exam.findIndex((val) => val.exam_id === payload.exam_id)
      if (findIndex !== -1) {
        const data = {
          exam_title: payload.exam_title,
          description: payload.description,
          time_limit: payload.time_limit,
          question_limit: payload.question_limit
        }
        state.data[findIndex] = { ...state.data[findIndex], ...data }
      }
    },

    removeQuestChoices(state, payload) {
      const findIndex = state.data.findIndex((val) => val.exam_id === payload.exam_id)
      if (findIndex !== -1) {
        state.data.splice(findIndex, 1)
      }
    }
  }
}
