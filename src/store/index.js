import { createStore } from 'vuex'
import examineeModule from './modules/examinee'
import courseModule from './modules/course'
import departmentModule from './modules/department'
import deansModule from './modules/deans'
export default createStore({
  modules: {
    examinee: examineeModule,
    course: courseModule,
    deans: deansModule,
    department: departmentModule
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
