import { useState } from 'react'
import { FollowStatus } from '../types/app'
import { axiosInstance } from '../lib/axios'
import clsx from 'clsx'
import NotLoggedModal from './notLoggedModal'
interface Prop {
  accountName: string
  followStatus: FollowStatus
  setFollow: React.Dispatch<React.SetStateAction<FollowStatus>>
}
const FollowController = ({ accountName, followStatus, setFollow }: Prop) => {
  const [openModal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const loggedHandler = async (type: boolean) => {
    setLoading(true)
    try {
      const res = type
        ? await axiosInstance.get(`/follow/${accountName}`)
        : await axiosInstance.delete(`/follow/${accountName}`)
      if (res.status === 200) {
        type ? setFollow('FOLLOWED') : setFollow('UN_FOLLOWED')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const notLoggedHander = () => {
    setModal((prev) => !prev)
  }

  return (
    <>
      <div
        className={clsx(
          'followController hoverAct',
          followStatus === 'FOLLOWED' && 'followed'
        )}
      >
        {isLoading ? (
          <span className='loading loading-dots loading-md'></span>
        ) : followStatus === 'FOLLOWED' ? (
          <span onClick={() => loggedHandler(false)}>Unfollow</span>
        ) : (
          <span
            onClick={() => {
              followStatus === 'NOT_LOGGED_IN'
                ? notLoggedHander()
                : loggedHandler(true)
            }}
          >
            Follow
          </span>
        )}
      </div>
      {openModal && <NotLoggedModal setModal={setModal}/>}
    </>
  )
}

export default FollowController
