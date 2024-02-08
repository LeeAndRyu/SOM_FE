import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { NotificationState, UserInfoState, UserTokenState } from '../store/user'
import { BACKEND_SERVER } from '../store/app'
import Avatar from './common/avatar'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getNotifications } from '../lib/useQuery/getNotifications'
import { NotificationItem } from '../types/api'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import clsx from 'clsx'
export const SseComponent = () => {
  const [token, _] = useRecoilState(UserTokenState)
  const [user, _2] = useRecoilState(UserInfoState)
  const queryClient = useQueryClient()
  const [notificatioinExist, setNtExist] = useRecoilState(NotificationState)
  const EventSource = EventSourcePolyfill || NativeEventSource
  useEffect(() => {
    if (token.accessToken === '') return
    const eventSource = new EventSource(`${BACKEND_SERVER}/sse/subscribe`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        Connection: 'keep-alive',
      },
    })
    eventSource.addEventListener('data', (event: any) => {
      const { data } = event
      if (!data.includes(`EventStream Created`)) {
        setNtExist({ msg: data, state: true })
        queryClient.invalidateQueries({
          queryKey: ['notifications', user.accountName],
        })
      }
    })
    return () => {
      eventSource.close()
    }
  }, [token])
  const { data } = useQuery<NotificationItem[]>({
    queryFn: getNotifications,
    queryKey: ['notifications', user.accountName],
  })
  return (
    <>
      <div
        className='dropdown'
        onClick={() =>
          setNtExist((prev) => {
            return { ...prev, state: false }
          })
        }
      >
        <button
          tabIndex={0}
          role='button'
          className='btn btn-ghost nofocus btn-circle'
        >
          <div className='indicator'>
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
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>

            {notificatioinExist.state === true && (
              <span className='badge badge-xs badge-primary indicator-item'></span>
            )}
          </div>
        </button>
        <div className='dropdown-content z-[1] bg-base-100 menu-dropdown-show' tabIndex={0}>
          <div id='sideMenuWrapper' className='notificationWrap'>
            <h5>알림내역</h5>
            {!data || data?.length === 0 ? (
              <p>알림 내역이 없습니다</p>
            ) : (
              <ul className='notificationWrap'>
                {data?.map((item) => (
                  <SseItem key={item.notificationId} item={item} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const SseItem = ({ item }: { item: NotificationItem }) => {
  const navigate = useNavigate()
  return (
    <li className={clsx('sseItem bg-base-100')}>
      <Avatar
        size={20}
        src={item.writerProfileImage}
        accountName={item.writerAccountName}
      />
      <div className='info'>
        <ul
          onClick={() => {
            navigate(`${item.url}`)
          }}
        >
          <li
            className='titleLi'
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></li>
          <li
            className='secondLi'
            dangerouslySetInnerHTML={{ __html: item.message1 }}
          ></li>
          <li
            className='thirdLi'
            dangerouslySetInnerHTML={{ __html: item.message2 }}
          ></li>
        </ul>
      </div>
      <div className='date'>
        <p>{dayjs(item.createdAt).format('YY-MM-DD')}</p>
      </div>
    </li>
  )
}
