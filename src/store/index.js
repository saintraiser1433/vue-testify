import { createStore } from 'vuex'
import departmentModule from './modules/department'
import deansModule from './modules/deans/'
import examModule from './modules/exam/'
export default createStore({
  modules: {
    deans: deansModule,
    department: departmentModule,
    exam: examModule
  },
  state: {
    isToggle: true
  },
  getters: {
    getToggleState(state) {
      return state.isToggle
    },
    getToastState(state) {
      return state.showToast
    }
  },
  actions: {
    setToggle({ commit }, payload) {
      commit('updateToggle', payload)
    }
  },
  mutations: {
    updateToggle(state, payload) {
      state.isToggle = payload
    }
  }
})
