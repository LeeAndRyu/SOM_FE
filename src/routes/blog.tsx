// import { useParams } from 'react-router-dom'
import Avatar from '../components/common/avatar'
import { FaCircleCheck } from 'react-icons/fa6'
import { MouseEventHandler, useState } from 'react'
import clsx from 'clsx'
import { IoSearchOutline } from 'react-icons/io5'
import ArticleWrap from '../components/articleWrap'
const Blog = () => {
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
  // const params = useParams()
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
            <div className='sec_inner'>
              <Avatar />
              <div className='info'>
                <p className='username text-lg'>나라</p>
                <p className='content text-base'>
                  한 줄 소개 영역입니다 한 줄 소개 영역입니다{' '}
                </p>
                <p className='follow'>
                  <span>
                    <strong>10</strong>팔로잉
                  </span>
                  <span>
                    <strong>5</strong>팔로워
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
                    <span>(20)</span>
                  </li>
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
                  <p className='resultP'>
                    🔍 총 <span>8개</span>의 포스트를 찾았습니다.
                  </p>
                  {/* <p className='resultP'>❌ 검색 결과가 없습니다</p> */}
                  <ArticleWrap type='blog' />
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
