["뒤로"](../README.md)

# Api 연동 Setting

Install axios

```bash
pnpm add axios
```

Add env `.env`

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Add token manage util `src/utils/token.ts`

```ts
const ACCESS_KEY = 'ACCESS_TOKEN'
const REFRESH_KEY = 'REFRESH_TOKEN'

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_KEY)
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_KEY, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_KEY)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_KEY, token)
}

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_KEY)
}
```

Axios setting

```ts
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

      if (status === 401) {
        alert('로그인이 만료되었어요!!')
        removeAccessToken()
        // window.location.href = '/login';
      }

      if (status >= 500) console.error('서버가 아파요!!')
    }
    return Promise.reject(error)
  },
)

export default instance
```
