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
