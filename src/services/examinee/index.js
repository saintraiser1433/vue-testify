import apiClient from '@/api/axios'

export const ExamineeApi = () => {
  const getExaminee = () => {
    return apiClient.get('/examinee')
  }

  const insertExaminee = (data) => {
    return apiClient.post('/examinee', JSON.stringify(data))
  }

  const updateExaminee = (data, id) => {
    return apiClient.put(`/examinee/${id}`, JSON.stringify(data))
  }

  const deleteExaminee = (id) => {
    return apiClient.delete(`/examinee/${id}`)
  }

  return { getExaminee, insertExaminee, updateExaminee, deleteExaminee }
}
