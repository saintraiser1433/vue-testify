import apiClient from '@/api/axios'

export const QuestionApi = () => {
  const getQuestions = () => apiClient.get('/question')
  const getQuestionById = (id) => apiClient.get(`/question/${id}`)
  const insertQuestion = (data) => apiClient.post('/question', JSON.stringify(data))
  const updateQuestion = (data, id) => apiClient.put(`/question/${id}`, JSON.stringify(data))
  const deleteQuestion = (id) => apiClient.delete(`/question/${id}`)

  return { getQuestions, getQuestionById, insertQuestion, updateQuestion, deleteQuestion }
}
