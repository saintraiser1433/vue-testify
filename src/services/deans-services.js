import apiClient from '@/api/axios'

export const DeansApi = () => {
  const getAssignDeanCourse = (id) => apiClient.get(`/deans/assign/${id}`)
  const getAllDeans = () => apiClient.get('/deans')
  const insertDeans = (data) => apiClient.post('/deans', JSON.stringify(data))
  const updateDeans = (data, id) => apiClient.put(`/deans/${id}`, data)
  const deleteDeans = (id) => apiClient.delete(`/deans/${id}`)

  return {
    getAssignDeanCourse,
    getAllDeans,
    insertDeans,
    updateDeans,
    deleteDeans
  }
}
