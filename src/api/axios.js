import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
