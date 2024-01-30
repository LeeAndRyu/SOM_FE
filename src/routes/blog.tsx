import Avatar from '../components/common/avatar'
import { FaCircleCheck } from 'react-icons/fa6'
import { Fragment, MouseEventHandler, useEffect, useState } from 'react'
import clsx from 'clsx'
import { IoSearchOutline } from 'react-icons/io5'
import ArticleWrap from '../components/articleWrap'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  getBlogList,
  getBlogMember,
  getBlogTags,
} from '../lib/useQuery/getBlog'
import { BlogMember, BlogTags, PostRes, TagItem } from '../types/api'
import { useRecoilState } from 'recoil'
import { HeadLinkState } from '../store/app'
const Blog = () => {
  const [_link, setLink] = useRecoilState(HeadLinkState)
  const params = useParams()
  const [tagList, setTagList] = useState<TagItem[]>([])
  const { data } = useQuery<BlogMember>({
    queryKey: ['blog', params.id],
    queryFn: getBlogMember,
    // enabled: memberId !== undefined,
  })
  const { data: tags } = useQuery<BlogTags>({
    queryKey: ['blog', params.id, 'tags'],
    queryFn: getBlogTags,
    // enabled: memberId !== undefined,
  })
  useEffect(() => {
    tags && setTagList(tags.tagList)
  }, [tags])
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<
    PostRes,
    Object,
    InfiniteData<PostRes>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ['blog', params.id!, 'posts'],
    queryFn: getBlogList,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageDto.totalPages === 0 ||
        lastPage.pageDto.totalPages === lastPage.pageDto.currentPage
        ? undefined
        : lastPage.pageDto.currentPage + 1
    },
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000,
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
  useEffect(() => {
    setLink({ path: `/blog/${params.id}`, content: data?.blogName || 'S ☻ M' })
  }, [data])
  const tabs = [
    {
      id: 0,
      title: '최신순',
    },
    {
      id: 1,
      title: '조회순',
    },
  ]
  const [tab, setTab] = useState<number>(0)
  const tabClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).nodeName !== 'A') return
    console.log((e.target as HTMLElement).dataset.idx)
    setTab(+(e.target as HTMLElement).dataset.idx!)
  }
  return (
    <>
      <div id='blog' className='mockup-browser border bg-base-100'>
        <div>
          <section id='user_sec'>
            <div className='sec_inner userInfoSec'>
              <Avatar src={data?.profileImage} />
              <div className='info'>
                <p className='username text-lg'>{data?.nickname}</p>
                <p className='content text-base'>{data?.introduction}</p>
                <p className='follow'>
                  <span>
                    <strong>{data?.followingCount}</strong>팔로잉
                  </span>
                  <span>
                    <strong>{data?.followerCount}</strong>팔로워
                  </span>
                </p>
              </div>
            </div>
          </section>
          <section id='content_sec'>
            <div className='sec_inner'>
              <div className='cont_left'>
                <h4>태그 목록</h4>
                <ul>
                  <li>
                    <p>전체보기</p>
                    <span>({tags?.totalPostCount})</span>
                  </li>
                  {tagList.map((tag) => (
                    <li key={tag.tagId}>
                      <p>{tag.tagName}</p>
                      <span>({tag.tagCount})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='cont_right'>
                <div className='tab_sec' onClick={tabClickHandler}>
                  <div className='tabWrap'>
                    {tabs.map((item) => (
                      <a
                        key={item.id}
                        className={clsx(item.id === tab && 'active')}
                        data-idx={item.id}
                      >
                        {item.title}
                        <FaCircleCheck />
                      </a>
                    ))}
                  </div>
                  <form>
                    <input type='text' placeholder='search' />
                    <IoSearchOutline />
                  </form>
                </div>
                <div className='result_sec'>
                  {posts?.pages.map((page, itemIdx: number) => (
                    <Fragment key={itemIdx}>
                      {page.postList.length < 1 ? (
                        <p className='resultP'>❌ 검색 결과가 없습니다</p>
                      ) : (
                        <>
                          <p className='resultP'>
                            🔍 총 <span>{page.pageDto.totalElement}개</span>의
                            포스트를 찾았습니다.
                          </p>
                          <ArticleWrap type='blog' list={page.postList} />
                        </>
                      )}
                    </Fragment>
                  ))}

                  <div ref={ref} style={{ height: 50 }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Blog
