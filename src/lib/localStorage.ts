export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const setAccessToken = (value: any) => {
  localStorage.setItem('accessToken', value)
}
export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}
export const setRefreshToken = (value: any) => {
  localStorage.setItem('refreshToken', value)
}
