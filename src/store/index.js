import { createStore } from 'vuex'
export default createStore({
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
