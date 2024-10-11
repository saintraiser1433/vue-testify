import { CourseApi } from '@/services/course'
export default {
  namespaced: true,
  state: {
    course: []
  },
  getters: {
    getCourse(state) {
      return state.course
    }
  },
  actions: {
    async fetchCourse({ commit }) {
      try {
        const response = await CourseApi().getCourse()

        commit('setCourse', response.data)
      } catch (e) {
        throw e
      }
    },

    addCourse({ commit }, payload) {
      commit('addCourse', payload)
    },
    editCourse({ commit }, payload) {
      commit('updateCourse', payload)
    },
    removeCourse({ commit }, payload) {
      commit('deleteCourse', payload)
    }
  },
  mutations: {
    setCourse(state, payload) {
      state.course = payload
    },
    addCourse(state, payload) {
      state.course.unshift(payload)
    },
    updateCourse(state, payload) {
      const findIndex = state.course.findIndex((val) => val.course_id === payload.course_id)
      if (findIndex !== -1) {
        const data = {
          description: payload.description,
          score: payload.score
        }
        state.course[findIndex] = { ...state.course[findIndex], ...data }
      }
    },

    deleteCourse(state, payload) {
      const findIndex = state.course.findIndex((val) => val.course_id === payload.course_id)
      if (findIndex !== -1) {
        state.course.splice(findIndex, 1)
      }
    }
  }
}
