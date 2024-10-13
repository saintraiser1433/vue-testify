import apiClient from '@/api/axios'

export const CourseApi = () => {
  const getCourse = () => apiClient.get('/course')
  const insertCourse = (data) => apiClient.post('/course', JSON.stringify(data))
  const updateCourse = (data, id) => apiClient.put(`/course/${id}`, JSON.stringify(data))
  const deleteCourse = (id) => apiClient.delete(`/course/${id}`)

  return { getCourse, insertCourse, updateCourse, deleteCourse }
}
