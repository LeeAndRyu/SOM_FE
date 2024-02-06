import { atom } from 'recoil'
export const ThemeState = atom({
  key: 'themeState',
  default: 'retro',
})
export const HeadLinkState = atom({
  key: 'headLinkState',
  default: {
    path: '/',
    content: `S ☻ M`,
  },
})

export const BACKEND_SERVER = 'https://118.67.142.194.nip.io'

