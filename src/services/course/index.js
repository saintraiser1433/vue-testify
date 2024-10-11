import apiClient from '@/api/axios'

export const CourseApi = () => {
  const getCourse = () => {
    return apiClient.get('/course')
  }

  const insertCourse = (data) => {
    return apiClient.post('/course', JSON.stringify(data))
  }
  const updateCourse = (data, id) => {
    return apiClient.put(`/course/${id}`, JSON.stringify(data))
  }

  const deleteCourse = (id) => {
    return apiClient.delete(`/course/${id}`)
  }

  return { getCourse, insertCourse, updateCourse, deleteCourse }
}
