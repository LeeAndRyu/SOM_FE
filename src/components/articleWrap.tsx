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
          list.map((item, idx) => (
            <Suspense key={idx}
              fallback={
                <li key={idx}>
                  <Skeleton width={'100%'} height={'100%'} />
                </li>
              }
            >
              <ArticleItem item={item} key={item.postId} />
            </Suspense>
          ))}
      </ul>
    </>
  )
}

export default ArticleWrap
