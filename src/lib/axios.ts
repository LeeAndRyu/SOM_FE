import axios from 'axios'
import { toast } from 'react-toastify'
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
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_SERVER,
})
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!!accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
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
  (error) => {
    if (errorCodes.includes(error.response.data.errorCode)) {
      toast.error(error.response?.data.errorMessage)
    }
    return Promise.reject(error)
  }
)
