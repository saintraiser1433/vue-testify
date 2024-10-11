import { ExamineeApi } from '@/services/examinee'
export default {
  namespaced: true,
  state: {
    examinee: []
  },
  getters: {
    getExaminee(state) {
      return state.examinee
    }
  },
  actions: {
    async fetchExaminees({ commit }) {
      try {
        const response = await ExamineeApi().getExaminee()
        commit('setExaminee', response.data)
      } catch (error) {
        throw error
      }
    },
    addExaminee({ commit }, payload) {
      commit('addExaminee', payload)
    },
    editExaminee({ commit }, payload) {
      commit('updateExaminee', payload)
    },
    removeExaminee({ commit }, payload) {
      commit('deleteExaminee', payload)
    }
  },
  mutations: {
    setExaminee(state, payload) {
      state.examinee = payload
    },
    addExaminee(state, payload) {
      const data = {
        examinee_id: payload.examinee_id,
        fullname: `${payload.first_name} ${payload.last_name} ${payload.middle_name || ''}`,
        first_name: payload.first_name,
        last_name: payload.last_name,
        middle_name: payload.middle_name,
        username: payload.username,
        password: payload.password
      }

      state.examinee.unshift(data)
    },
    updateExaminee(state, payload) {
      const findIndex = state.examinee.findIndex((val) => val.examinee_id === payload.examinee_id)
      if (findIndex !== -1) {
        const data = {
          first_name: payload.first_name,
          last_name: payload.last_name,
          middle_name: payload.middle_name
        }
        state.examinee[findIndex] = { ...state.examinee[findIndex], ...data }
      }
    },

    deleteExaminee(state, payload) {
      const findIndex = state.examinee.findIndex((val) => val.examinee_id === payload.examinee_id)
      if (findIndex !== -1) {
        state.examinee.splice(findIndex, 1)
      }
    }
  }
}
