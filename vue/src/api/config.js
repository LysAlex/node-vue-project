import axios from 'axios'

const api = axios.create({
  baseUrl: "http://localhost:3000/",
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
})

api.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
