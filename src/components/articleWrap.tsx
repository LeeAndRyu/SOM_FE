import clsx from 'clsx'
import ArticleItem from './articleItem'
import { getClassNames } from '../lib/lib'
import { PostItem } from '../types/api'
interface Prop {
  type?: string
  list?: PostItem[]
}
const ArticleWrap = ({ type, list }: Prop) => {
  return (
    <>
      <ul className={clsx('articleWrap', getClassNames(type!))}>
        {list &&
          list.map((item) => <ArticleItem item={item} key={item.postId} />)}
      </ul>
    </>
  )
}

export default ArticleWrap
