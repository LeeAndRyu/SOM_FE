import { useEffect } from 'react'

import { FollowStatus } from '../types/app'
// import { useNavigate } from 'react-router-dom'
interface Prop {
  accountName: string
  followStatus: FollowStatus
  setFollow: React.Dispatch<React.SetStateAction<FollowStatus>>
}
const FollowController = ({ accountName, followStatus, setFollow }: Prop) => {
  // const navigate = useNavigate()
  // const notLoggedHander = () => {}
  useEffect(() => {
    console.log(accountName, followStatus, setFollow)
  }, [])
  return (
    <>
      <div className='followController hoverAct'>
        <span>팔로우하기</span>
        {/* <BsPersonPlus /> */}
      </div>
{/*       <div className='fixModal'>
        <div className='card w-96 bg-neutral text-neutral-content'>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Accept</button>
              <button className='btn btn-ghost'>Deny</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default FollowController
