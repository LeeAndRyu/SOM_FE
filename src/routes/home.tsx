import { MouseEventHandler, useState } from 'react'
import ArticleWrap from '../components/articleWrap'
import clsx from 'clsx'

const Home = () => {
  const tabs = [
    {
      id: 0,
      title: 'Popular',
    },
    {
      id: 1,
      title: 'New',
    },
    {
      id: 2,
      title: 'Feed',
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
            className={clsx('tab', item.id === tab && 'tab-active')}
            data-idx={item.id}
          >
            {item.title}
          </a>
        ))}
      </div>
      {tab === 0 ? <ArticleWrap /> : tab === 1 ? <p>11</p> : <p>2</p>}
    </>
  )
}

export default Home
