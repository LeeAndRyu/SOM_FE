import axios from 'axios'
import { UserResponse } from '../types/api'
import {
  getLocalStorage,
  setAccessToken,
  setLocalStorage,
  setRefreshToken,
} from './localStorage'
import { axiosInstance } from './axios'

export const LoginSuccess = async (res: UserResponse) => {
  setAccessToken(res.tokenResponse.accessToken)
  setLocalStorage('user', res.member)
  setRefreshToken(res.tokenResponse.refreshToken)
}
export const LogoutFun = async () => {
  try {
    const res = await axiosInstance.post('/logout')
    if (res.status === 200) {
      localStorage.clear()
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

export const tokenRefresh = async () => {
  const token = getLocalStorage('refreshToken')
  try {
    const res = await axios.get('https://118.67.142.194.nip.io/reissue', {
      headers: {
        RefreshToken: `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      setAccessToken((res.data as UserResponse).tokenResponse.accessToken)
      setRefreshToken((res.data as UserResponse).tokenResponse.refreshToken)
      
    }
  } catch (error) {
    console.log(error)
  }
}
