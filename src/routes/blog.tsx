// import { useParams } from 'react-router-dom'
import Avatar from '../components/common/avatar'

import { FaCircleCheck } from 'react-icons/fa6'
import { MouseEventHandler, useState } from 'react'
import clsx from 'clsx'
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
      <div id='blog' className='mockup-browser border bg-base-300'>
        <div className='mockup-browser-toolbar'>
          <form>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input type='text' className='input' />
          </form>
        </div>
        <div className='bg-base-200'>
          {' '}
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
                </div>
                {tab === 0 ? <p>0</p> : <p>1</p>}

                <ul>
                  <li></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Blog
