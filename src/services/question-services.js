import apiClient from '@/api/axios'

export const QuestionApi = () => {
  const getQuestions = () => apiClient.get('/question')
  const getQuestionById = (id) => apiClient.get(`/question/${id}`)
  const insertQuestChoices = (data) => apiClient.post('/question', JSON.stringify(data))
  const updateQuestChoices = (data, id) => apiClient.put(`/question/${id}`, JSON.stringify(data))
  const deleteQuestionChoices = (id) => apiClient.delete(`/question/${id}`)

  return {
    getQuestions,
    getQuestionById,
    insertQuestChoices,
    updateQuestChoices,
    deleteQuestionChoices
  }
}
