import { atom } from 'recoil'
import Image from '../assets/basicProfile.png'
export const UserInfoState = atom({
  key: 'userInfoState',
  default: {
    member: {
      accountName: '',
      blogName: '',
      email: '',
      introduction: '',
      memberId: 0,
      nickname: '',
      profileImage: Image,
      registeredAt: '2024-01-23T08:50:41.224Z',
      role: 'UNAUTH',
    },
    tokenResponse: {
      accessToken: '',
      refreshToken: '',
      tokenType: '',
    },
  },
})
