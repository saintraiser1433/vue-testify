import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    department: [
      {
        id: 1,
        department: 'Department of Education',
        status: 0
      },
      {
        id: 2,
        department: 'Department of Good Governance',
        status: 1
      }
    ]
  },
  getters: {
    getDepartment(state) {
      return state.department
    }
  },
  actions: {
    setDepartment({ commit }, payload) {
      commit('addDepartment', payload)
    },
    editDepartment({ commit }, payload) {
      commit('updateDepartment', payload)
    },
    removeDepartment({ commit }, payload) {
      commit('deleteDepartment', payload)
    }
  },
  mutations: {
    addDepartment(state, payload) {
      const department = {
        id: uuidv4(),
        department: payload.department,
        status: payload.status
      }
      state.department.push(department)
    },
    updateDepartment(state, payload) {
      const findIndex = state.department.findIndex((val) => val.id === payload.id)

      const data = {
        department: payload.department,
        status: payload.status
      }
      state.department[findIndex] = { ...state.department[findIndex], ...data }
    },

    deleteDepartment(state, payload) {
      const findIndex = state.department.findIndex((val) => val.id === payload.id)
      state.department.splice(findIndex, 1)
    }
  }
}
