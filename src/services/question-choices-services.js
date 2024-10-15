import apiClient from '@/api/axios'

export const QuestionChoicesApi = () => {
  const getQuestionChoicesById = () => apiClient.get(`/question/7`)
  const insertQuestChoices = (data) => apiClient.post('/question', JSON.stringify(data))
  const updateQuestChoices = (data, id) => apiClient.put(`/question/${id}`, JSON.stringify(data))
  const deleteQuestionChoices = (id) => apiClient.delete(`/question/${id}`)

  return {
    getQuestionChoicesById,
    insertQuestChoices,
    updateQuestChoices,
    deleteQuestionChoices
  }
}
