import { MouseEventHandler, useState } from 'react'
import ArticleWrap from '../components/articleWrap'
import clsx from 'clsx'
import { MdOutlineRssFeed, MdPerson } from 'react-icons/md'
import { HiMiniFire } from 'react-icons/hi2'
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
            className={clsx('tab font-semibold hasSvg', item.id === tab && 'tab-active')}
            data-idx={item.id}
          >
            {item.icon}
            &nbsp;
            {item.title}
          </a>
        ))}
      </div>
      {tab === 0 ? <ArticleWrap /> : tab === 1 ? <p>11</p> : <p>2</p>}
    </>
  )
}

export default Home
