import { createStore } from 'vuex'
import examineeModule from './modules/examinee'
import courseModule from './modules/course'
import departmentModule from './modules/department'
import deansModule from './modules/deans/'
import examModule from './modules/exam/'
import questChoicesModule from './modules/quest-choices'
export default createStore({
  modules: {
    examinee: examineeModule,
    course: courseModule,
    deans: deansModule,
    department: departmentModule,
    exam: examModule,
    questChoices: questChoicesModule
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
