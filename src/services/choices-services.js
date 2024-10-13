import apiClient from '@/api/axios'

export const ChoicesApi = () => {
  const getChoicesByExamId = (id) => apiClient.get(`/choices/exam/${id}`)
  const insertChoices = (data) => apiClient.post('/choices', JSON.stringify(data))
  const updateChoices = (data, id) => apiClient.put(`/choices/${id}`, JSON.stringify(data))
  const deleteChoices = (id) => apiClient.delete(`/choices/${id}`)

  return { getChoicesByExamId, insertChoices, updateChoices, deleteChoices }
}
