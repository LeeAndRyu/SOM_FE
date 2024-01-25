export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const setTokenStorage = (value: any) => {
  localStorage.setItem('accessToken', JSON.stringify(value))
}
