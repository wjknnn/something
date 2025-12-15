import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { getAccessToken, removeAccessToken } from '@/utils/token'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response

      console.log(status)

      if (status === 401) {
        alert('로그인이 만료되었어요!!')
        removeAccessToken()
        window.location.href = '/login'
      }

      if (status >= 500) console.error('서버가 아파요!!')
    }
    return Promise.reject(error)
  },
)

export default instance
