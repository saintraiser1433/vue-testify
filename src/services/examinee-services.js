import apiClient from '@/api/axios'

export const ExamineeApi = () => {
  const getExaminee = () => apiClient.get('/examinee')
  const insertExaminee = (data) => apiClient.post('/examinee', JSON.stringify(data))
  const updateExaminee = (data, id) => apiClient.put(`/examinee/${id}`, JSON.stringify(data))
  const deleteExaminee = (id) => apiClient.delete(`/examinee/${id}`)

  return { getExaminee, insertExaminee, updateExaminee, deleteExaminee }
}
