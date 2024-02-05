import { atom } from 'recoil'
import Image from '../assets/avatar-1.jpg'
export const UserInfoState = atom({
  key: 'userInfoState',
  default: {
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
})
export const UserTokenState = atom({
  key: 'userTokenState',
  default: {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
  },
})

export const NotificationState = atom({
  key: 'notificationState',
  default: {
    msg: '',
    state: false,
  },
})
