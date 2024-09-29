import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    examinee: [
      {
        id: 1,
        first_name: 'John Rey',
        last_name: 'Decosta',
        middle_name: 'Xavier',
        username: 'xjsxc',
        password: 'dasdasdas'
      },
      {
        id: 2,
        first_name: 'Jerald',
        last_name: 'Bacquiano',
        middle_name: 'Abano',
        username: 'asdfvv',
        password: 'awedsd'
      }
    ]
  },
  getters: {
    getExaminee(state) {
      return state.examinee
    }
  },
  actions: {
    setExaminee({ commit }, payload) {
      const examinee = {
        id: uuidv4(),
        first_name: payload.firstname,
        last_name: payload.lastname,
        middle_name: payload.middlename,
        username: 'user1',
        password: 'user1'
      }
      commit('addExaminee', examinee)
    },
    editExaminee({ commit }, payload) {
      commit('updateExaminee', payload)
    },
    removeExaminee({ commit }, payload) {
      commit('deleteExaminee', payload)
    }
  },
  mutations: {
    addExaminee(state, payload) {
      state.examinee.push(payload)
    },
    updateExaminee(state, payload) {
      const findIndex = state.examinee.findIndex((val) => val.id === payload.id)
      const data = {
        first_name: payload.firstname,
        last_name: payload.lastname,
        middle_name: payload.middlename
      }
      state.examinee[findIndex] = { ...state.examinee[findIndex], ...data }
    },

    deleteExaminee(state, payload) {
      const findIndex = state.examinee.findIndex((val) => val.id === payload.id)
      state.examinee.splice(findIndex, 1)
    }
  }
}
