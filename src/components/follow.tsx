import { useState } from 'react'
import { FollowStatus } from '../types/app'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import clsx from 'clsx'
interface Prop {
  accountName: string
  followStatus: FollowStatus
  setFollow: React.Dispatch<React.SetStateAction<FollowStatus>>
}
const FollowController = ({ accountName, followStatus, setFollow }: Prop) => {
  const [openModal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
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
              followStatus === null ? notLoggedHander() : loggedHandler(true)
            }}
          >
            Follow
          </span>
        )}
      </div>
      {openModal && (
        <div className='fixModal'>
          <div className='card w-96 bg-neutral text-neutral-content'>
            <div className='card-body items-center text-center'>
              <h2 className='card-title mb-2'>로그인이 필요한 기능입니다</h2>
              <p className='mb-5'>해당 페이지로 이동하시겠습니까?</p>
              <div className='card-actions justify-end '>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate('/login')}
                >
                  이동
                </button>
                <button
                  className='btn btn-ghost'
                  onClick={() => setModal((prev) => !prev)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FollowController
