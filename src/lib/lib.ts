import { toast } from 'react-toastify'

export const getClassNames = (type: string) => {
  switch (type) {
    case 'home':
      return 'homeArticle'
      break
    case 'blog':
      return 'blogArticle'
      break
    default:
      return 'homeArticle'
      break
  }
}
export const handleCopyClipBoard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    toast.success('클립보드에 링크가 복사되었습니다')
  } catch (err) {
    console.log(err)
  }
}
