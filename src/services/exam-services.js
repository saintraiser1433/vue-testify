import apiClient from '@/api/axios'

export const ExamApi = () => {
  const getExam = () => apiClient.get('/exam')
  const getExamById = (id) => apiClient.get(`/exam/${id}`)
  const insertExam = (data) => apiClient.post('/exam', data)
  const updateExam = (data, id) => apiClient.put(`/exam/${id}`, data)
  const deleteExam = (id) => apiClient.delete(`/exam/${id}`)

  return { getExam, insertExam, updateExam, deleteExam, getExamById }
}
