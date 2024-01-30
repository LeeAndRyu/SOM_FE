import Avatar from '../components/common/avatar'
import { FaCircleCheck } from 'react-icons/fa6'
import { Fragment, useEffect, useState } from 'react'

import { IoSearchOutline } from 'react-icons/io5'
import ArticleWrap from '../components/articleWrap'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  getBlogList,
  getBlogMember,
  getBlogTags,
} from '../lib/useQuery/getBlog'
import { BlogMember, BlogTags, PostRes, TagItem } from '../types/api'
import { useRecoilState } from 'recoil'
import { HeadLinkState } from '../store/app'
import clsx from 'clsx'

const Blog = () => {
  const [_link, setLink] = useRecoilState(HeadLinkState)
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  // const [filter, setFilter] = useState({})
  const [tagList, setTagList] = useState<TagItem[]>([])
  const [sort, setSort] = useState('latest')
  const { data } = useQuery<BlogMember>({
    queryKey: ['blog', params.id],
    queryFn: getBlogMember,
  })
  const { data: tags } = useQuery<BlogTags>({
    queryKey: ['blog', params.id, 'tags'],
    queryFn: getBlogTags,
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
    [_1: string, _2: string, _3: string, _4: URLSearchParams],
    number
  >({
    queryKey: ['blog', params.id!, 'posts', searchParams],
    queryFn: getBlogList,
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
  useEffect(() => {
    console.dir(searchParams.toString())
  }, [searchParams])
  useEffect(() => {
    setLink({ path: `/blog/${params.id}`, content: data?.blogName || 'S ☻ M' })
  }, [data])
  useEffect(() => {
    console.log(sort)
    setSearchParams({ sort: sort })
  }, [sort])
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
                  <li onClick={() => setSearchParams({})}>
                    <p>전체보기</p>
                    <span>({tags?.totalPostCount})</span>
                  </li>
                  {tagList.map((tag) => (
                    <li
                      key={tag.tagId}
                      onClick={() => setSearchParams({ tag: tag.tagName })}
                    >
                      <p>{tag.tagName}</p>
                      <span>({tag.tagCount})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='cont_right'>
                <div className='tab_sec'>
                  <div className='tabWrap'>
                    {/*                     {tabs.map((item) => (
                      <a
                        key={item.id}
                        className={clsx(item.id === tab && 'active')}
                        data-idx={item.id}
                        onClick={() => setSearchParams({ sort: item.title })}
                      >
                        {item.title}
                        <FaCircleCheck />
                      </a>
                    ))} */}
                    <div
                      className={clsx(
                        'sortItem',
                        sort === 'latest' && 'active'
                      )}
                    >
                      <input
                        type='radio'
                        name='sort'
                        id='latest'
                        defaultChecked
                        onChange={(e) => {
                          if (e.target.checked) setSort(() => 'latest')
                        }}
                      />
                      <label htmlFor='latest'>latest</label>
                      <FaCircleCheck />
                    </div>
                    <div
                      className={clsx('sortItem', sort === 'hot' && 'active')}
                    >
                      <input
                        type='radio'
                        name='sort'
                        id='hot'
                        // defaultChecked={sort === 'hot'}
                        onChange={(e) => {
                          if (e.target.checked) setSort(() => 'hot')
                        }}
                      />
                      <label htmlFor='hot'>hot</label>
                      <FaCircleCheck />
                    </div>
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
