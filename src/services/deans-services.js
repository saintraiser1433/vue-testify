import apiClient from '@/api/axios'

export const DeansApi = () => {
  const getAllDeans = () => apiClient.get('/deans')
  const insertDeans = (data) => apiClient.post('/deans', JSON.stringify(data))
  const updateDeans = (data, id) => apiClient.put(`/deans/${id}`, data)
  const deleteDeans = (id) => apiClient.delete(`/deans/${id}`)

  const getAssignDeanCourse = (id) => apiClient.get(`/deans/assign/${id}`)
  const insertAssignDeansCourse = (data) => apiClient.post(`/deans/assign`, JSON.stringify(data))
  const deleteAssignDeansCourse = (deansId, courseId) =>
    apiClient.delete(`/deans/assign/${deansId}/${courseId}`)

  return {
    getAssignDeanCourse,
    insertAssignDeansCourse,
    deleteAssignDeansCourse,
    getAllDeans,
    insertDeans,
    updateDeans,
    deleteDeans
  }
}
