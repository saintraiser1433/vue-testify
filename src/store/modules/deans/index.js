import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    deans: [
      {
        id: 1,
        first_name: 'John Rey',
        last_name: 'Decosta',
        middle_name: 'Xavier',
        departmentId: 1,
        username: 'xjsxc',
        password: 'dasdasdas',
        status: 0
      },
      {
        id: 2,
        first_name: 'Jerald',
        last_name: 'Bacquiano',
        middle_name: 'Abano',
        departmentId: 2,
        username: 'asdfvv',
        password: 'awedsd',
        status: 1
      }
    ]
  },
  getters: {
    getDeans(state) {
      return state.deans
    }
  },
  actions: {
    setDeans({ commit }, payload) {
      const deans = {
        id: uuidv4(),
        first_name: payload.firstname,
        last_name: payload.lastname,
        middle_name: payload.middlename,
        username: 'user1',
        password: 'user1',
        departmentId: payload.departmentId,
        status: payload.status
      }
      commit('addDeans', deans)
    },
    editDeans({ commit }, payload) {
      commit('updateDeans', payload)
    },
    removeDeans({ commit }, payload) {
      commit('deleteDeans', payload)
    }
  },
  mutations: {
    addDeans(state, payload) {
      state.deans.push(payload)
    },
    updateDeans(state, payload) {
      const findIndex = state.deans.findIndex((val) => val.id === payload.id)
      const data = {
        first_name: payload.firstname,
        last_name: payload.lastname,
        middle_name: payload.middlename,
        departmentId: payload.departmentId,
        status: payload.status
      }
      state.deans[findIndex] = { ...state.deans[findIndex], ...data }
    },

    deleteDeans(state, payload) {
      const findIndex = state.Deans.findIndex((val) => val.id === payload.id)
      state.Deans.splice(findIndex, 1)
    }
  }
}
