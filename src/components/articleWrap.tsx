import clsx from 'clsx'
import ArticleItem from './articleItem'
import { getClassNames } from '../lib/lib'
import Skeleton from './common/skeleton'
import { Suspense } from 'react'
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
          list.map((item) => (
            <Suspense
              fallback={
                <li key={item.postId}>
                  <Skeleton width={'100%'} height={'100%'} />
                </li>
              }
            >
              <ArticleItem item={item} />
            </Suspense>
          ))}
      </ul>
    </>
  )
}

export default ArticleWrap
