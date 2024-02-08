import { IoMdSearch } from 'react-icons/io'
import ArticleWrap from '../components/articleWrap'
import { FormEventHandler, Fragment, useEffect, useState } from 'react'
import { PostRes } from '../types/api'
import {
  InfiniteData,
  useInfiniteQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getSearchList } from '../lib/useQuery/getSearch'
import Skeleton from '../components/common/skeleton'
import { toast } from 'react-toastify'
type SearchType = 'title' | 'content' | 'tag'
const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchType, setType] = useState<SearchType>('title')
  const [isTouched, setTouched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isError,
    isFetching,
    isFetched,
  } = useInfiniteQuery<
    PostRes,
    Object,
    InfiniteData<PostRes>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ['search', searchType, searchValue],
    queryFn: getSearchList,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      return lastPage.pageDto.totalPages === 0 ||
        lastPage.pageDto.totalPages === lastPage.pageDto.currentPage
        ? undefined
        : lastPage.pageDto.currentPage + 1
    },
    enabled: !!isTouched && searchValue !== '',
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
  const onSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault()
    if (inputValue === '') {
      toast.warn('검색어를 입력해주세요')
      return
    }
    setSearchValue(inputValue)
    setTouched(true)
  }
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <span>
          <IoMdSearch />
        </span>
        <input
          type='text'
          defaultValue={inputValue}
          placeholder='Search'
          className=' bg-base-200 border-none outline-neutral text-neutral searchInput input input-bordered input-lg w-full'
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div className='typeSec'>
        <p>
          <label htmlFor='inputTitle'>제목 및 소개</label>
          <input
            type='radio'
            name='searchType'
            id='inputTitle'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('title')}
            checked={searchType === 'title'}
          />
        </p>
        <p>
          <label htmlFor='inputContent'>내용</label>
          <input
            type='radio'
            name='searchType'
            id='inputContent'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('content')}
            checked={searchType === 'content'}
          />
        </p>
        <p>
          <label htmlFor='inputTag'>태그</label>
          <input
            type='radio'
            name='searchType'
            id='inputTag'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('tag')}
            checked={searchType === 'tag'}
          />
        </p>
      </div>
      <div className='search_sec'>
        <ArticleWrap />
      </div>

      {isFetched && isSuccess ? (
        data && data.pages[0].pageDto.totalElement === 0 ? (
          // 검색 결과가 0일 때
          <p className='warnResultP'>⚠️ 검색 결과가 없습니다 ⚠️</p>
        ) : (
          <>
            <div>
              <p className='resultP'>
                🔍 총 <span>{data.pages[0].pageDto.totalElement}</span>건이
                검색되었습니다
              </p>
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
      ) : isFetching || isError ? (
        // 아직 fetching 중이거나 에러 발생 시
        <>
          <ul className='articleWrap homeArticle'>
            {new Array(8).fill('').map((_, idx) => (
              <Skeleton key={idx} height={'300px'} />
            ))}
          </ul>
        </>
      ) : (
        // fetching 전
        <></>
      )}
    </>
  )
}

export default Search
