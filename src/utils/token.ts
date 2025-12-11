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
