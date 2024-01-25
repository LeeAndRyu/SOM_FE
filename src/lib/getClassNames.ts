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