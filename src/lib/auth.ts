import axios from 'axios'
import { UserDetail } from '../types/api'
import {
  getLocalStorage,
  setAccessToken,
  setLocalStorage,
} from './localStorage'

export const LoginSuccess = async (res: UserDetail) => {
  setAccessToken(res.tokenResponse.accessToken)
  setLocalStorage('user', res.member)
  setLocalStorage('refreshToken', res.tokenResponse.refreshToken)
}

export const tokenRefresh = async () => {
  const token = getLocalStorage('refreshToken')
  try {
    const res = await axios.get('/reissue', {
      headers: {
        RefreshToken: `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      setAccessToken((res.data as UserDetail).tokenResponse.accessToken)
    }
  } catch (error) {
    console.log(error)
  }
}
