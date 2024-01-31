import { useEffect } from 'react'

import { FollowStatus } from '../types/app'
interface Prop {
  accountName: string
  followStatus: FollowStatus
  setFollow: React.Dispatch<React.SetStateAction<FollowStatus>>
}
const FollowController = ({ accountName, followStatus, setFollow }: Prop) => {
  useEffect(() => {
    console.log(accountName, followStatus)
  }, [])
  return (
    <div className='followController hoverAct'>
      <span>팔로우하기</span>
      {/* <BsPersonPlus /> */}
    </div>
  )
}

export default FollowController
