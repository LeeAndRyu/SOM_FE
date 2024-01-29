import { Fragment, MouseEventHandler, useEffect, useState } from 'react'
import ArticleWrap from '../components/articleWrap'
import clsx from 'clsx'
import { MdOutlineRssFeed, MdPerson } from 'react-icons/md'
import { HiMiniFire } from 'react-icons/hi2'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { PostRes } from '../types/api'
import { getHomeList } from '../lib/useQuery/getHome'
const Home = () => {
  const tabs = [
    {
      id: 0,
      title: 'Hot',
      icon: <HiMiniFire />,
    },
    {
      id: 1,
      title: 'New',
      icon: <MdOutlineRssFeed />,
    },
    {
      id: 2,
      title: 'Feed',
      icon: <MdPerson />,
    },
  ]
  const [tab, setTab] = useState<number>(0)
  const tabClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).nodeName !== 'A') return
    console.log((e.target as HTMLElement).dataset.idx)
    setTab(+(e.target as HTMLElement).dataset.idx!)
  }
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    PostRes,
    Object,
    InfiniteData<PostRes>,
    [_1: string, _2: number],
    number
  >({
    queryKey: ['home', tab],
    queryFn: getHomeList,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageDto.totalPages === 0 ||
        lastPage.pageDto.totalPages === lastPage.pageDto.currentPage
        ? undefined
        : lastPage.pageDto.currentPage + 1
    },
  })
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])
  return (
    <>
      <div
        role='tablist'
        className='tabs tabs-boxed w-fit mb-5 p-2'
        onClick={tabClickHandler}
      >
        {tabs.map((item) => (
          <a
            key={item.id}
            role='tab'
            className={clsx(
              'tab font-semibold hasSvg',
              item.id === tab && 'tab-active'
            )}
            data-idx={item.id}
          >
            {item.icon}
            &nbsp;
            {item.title}
          </a>
        ))}
      </div>
      <div>
        {data?.pages.map((page, itemIdx: number) => (
          <Fragment key={itemIdx}>
            {page.postList.length < 1 ? (
              <p className='resultP'>❌</p>
            ) : (
              <>
                <ArticleWrap type='home' list={page.postList} />
              </>
            )}
          </Fragment>
        ))}
        <div ref={ref} style={{ height: 50 }} />
      </div>
    </>
  )
}

export default Home
