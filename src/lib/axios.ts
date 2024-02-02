import axios from 'axios'
import { toast } from 'react-toastify'
import { tokenRefresh } from './auth'
import { getLocalStorage } from './localStorage'
const errorCodes: string[] = [
  'EMAIL_ALREADY_EXISTS',
  'MEMBER_PASSWORD_INCORRECT',
  'ACCOUNT_NAME_ALREADY_EXISTS',
  'LOGIN_FAILED_PASSWORD_INCORRECT',
  'LOGIN_FAILED_MEMBER_NOT_FOUND',
  'EMAIL_ALREADY_EXISTS',
  'ALREADY_FOLLOWED',
  'FOLLOW_NOT_FOUND',
  'INTERNAL_SERVER_ERROR',
]
const userAgent = navigator.userAgent
export const axiosInstance = axios.create({
  baseURL: 'https://118.67.142.194.nip.io',
})
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!!accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    if (!!userAgent)
      config.headers['Custom-Access-User'] = userAgent

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (errorCodes.includes(error.response.data.errorCode)) {
      toast.error(error.response?.data.errorMessage)
    }
    // 토큰 만료 시 처리
    if (
      [
        'TOKEN_TIME_OUT',
        'ACCESS_DENIED',
        'JWT_REFRESH_TOKEN_NOT_FOUND',
      ].includes(error.response.data.errorCode)
    ) {
      await tokenRefresh()
      const TOKEN = getLocalStorage('accessToken')
      if (!!TOKEN) error.config.headers['Authorization'] = `Bearer ${TOKEN}`
      const response = await axios.request(error.config)
      return response
    }
    return Promise.reject(error)
  }
)
