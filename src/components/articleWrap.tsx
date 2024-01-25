import clsx from 'clsx'
import ArticleItem from './articleItem'
import { getClassNames } from '../lib/getClassNames'
interface Prop {
  type?: string
  list?: any
}
const ArticleWrap = ({ type }: Prop) => {
  return (
    <>
      <ul className={clsx('articleWrap', getClassNames(type!))}>
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
      </ul>
    </>
  )
}

export default ArticleWrap
