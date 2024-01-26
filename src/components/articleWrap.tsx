import clsx from 'clsx'
import ArticleItem from './articleItem'
import { getClassNames } from '../lib/getClassNames'
import Skeleton from './common/skeleton'
import { Suspense } from 'react'
interface Prop {
  type?: string
  list?: any
}
const ArticleWrap = ({ type }: Prop) => {
  return (
    <>
      <ul className={clsx('articleWrap', getClassNames(type!))}>
        <Suspense
          fallback={
            <li>
              <Skeleton width={'100%'} height={'100%'} />
            </li>
          }
        >
          <ArticleItem />
        </Suspense>

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
