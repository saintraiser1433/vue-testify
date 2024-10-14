import { ExamApi } from '@/services/exam-services'
export default {
  namespaced: true,
  state: {
    exam: []
  },
  getters: {
    getExam(state) {
      return state.exam
    }
  },
  actions: {
    async fetchExam({ commit }) {
      try {
        const response = await ExamApi().getExam()

        commit('setExam', response.data)
      } catch (e) {
        throw e
      }
    },

    addExam({ commit }, payload) {
      commit('addExam', payload)
    },
    editExam({ commit }, payload) {
      commit('updateExam', payload)
    },
    removeExam({ commit }, payload) {
      commit('deleteExam', payload)
    }
  },
  mutations: {
    setExam(state, payload) {
      state.exam = payload
    },
    addExam(state, payload) {
      state.exam.unshift(payload)
    },
    updateExam(state, payload) {
      const findIndex = state.exam.findIndex((val) => val.exam_id === payload.exam_id)
      if (findIndex !== -1) {
        const data = {
          exam_title: payload.exam_title,
          description: payload.description,
          time_limit: payload.time_limit,
          question_limit: payload.question_limit
        }
        state.exam[findIndex] = { ...state.exam[findIndex], ...data }
      }
    },

    deleteExam(state, payload) {
      const findIndex = state.exam.findIndex((val) => val.exam_id === payload.exam_id)
      if (findIndex !== -1) {
        state.exam.splice(findIndex, 1)
      }
    }
  }
}
