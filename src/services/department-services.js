import apiClient from '@/api/axios'

export const DepartmentApi = () => {
  const getDepartment = () => apiClient.get('/department')
  const insertDepartment = (data) => apiClient.post('/department', JSON.stringify(data))
  const updateDepartment = (data, id) => apiClient.put(`/department/${id}`, JSON.stringify(data))
  const deleteDepartment = (id) => apiClient.delete(`/department/${id}`)

  return { getDepartment, insertDepartment, updateDepartment, deleteDepartment }
}
