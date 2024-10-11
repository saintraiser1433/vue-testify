import apiClient from '@/api/axios'

export const ExamApi = () => {
  const getExam = () => {
    return apiClient.get('/exam')
  }
  const insertExam = (data) => {
    return apiClient.post('/exam', data)
  }
  const updateExam = (data, id) => {
    return apiClient.put(`/exam/${id}`, data)
  }
  const deleteExam = (id) => {
    return apiClient.delete(`/exam/${id}`)
  }

  return { getExam, insertExam, updateExam, deleteExam }
}
