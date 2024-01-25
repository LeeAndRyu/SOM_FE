import { UserDetail } from '../types/api'
import { setLocalStorage } from './localStorage'

export const LoginSuccess = async (res: UserDetail) => {
  setLocalStorage('user', res.member)
  setLocalStorage('accessToken', res.tokenResponse.accessToken)
}
