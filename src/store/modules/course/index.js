import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    course: [
      {
        id: 1,
        course: 'Bachelor of Science in Agriculture Major in Horticulture (BS Agri-Horticulture)',
        prefix: 'BSAMH',
        score: 50
      },
      {
        id: 2,
        course: 'Bachelor of Secondary Education(BSED-Math) major in Mathematics',
        prefix: 'BSED-MATH',
        score: 30
      }
    ]
  },
  getters: {
    getCourse(state) {
      return state.course
    }
  },
  actions: {
    setCourse({ commit }, payload) {
      const course = {
        id: uuidv4(),
        course: payload.course,
        prefix: payload.prefix,
        score: payload.score
      }
      commit('addCourse', course)
    },
    editCourse({ commit }, payload) {
      commit('updateCourse', payload)
    },
    removeCourse({ commit }, payload) {
      commit('deleteCourse', payload)
    }
  },
  mutations: {
    addCourse(state, payload) {
      state.course.push(payload)
    },
    updateCourse(state, payload) {
      const findIndex = state.course.findIndex((val) => val.id === payload.id)
      const data = {
        course: payload.course,
        prefix: payload.prefix,
        score: payload.score
      }
      state.course[findIndex] = { ...state.course[findIndex], ...data }
    },

    deleteCourse(state, payload) {
      const findIndex = state.course.findIndex((val) => val.id === payload.id)
      state.course.splice(findIndex, 1)
    }
  }
}
