import React, { MouseEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './common/avatar'
import { IoMdClose } from 'react-icons/io'
import { LogoutFun } from '../lib/auth'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserInfoState, UserTokenState } from '../store/user'
import { toast } from 'react-toastify'
import { getLocalStorage } from '../lib/localStorage'
interface Prop {
  setMoAsideToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const MobAside = ({ setMoAsideToggle }: Prop) => {
  const navigate = useNavigate()
  const saveduser = getLocalStorage('user')
  const [user, _] = useRecoilState(UserInfoState)
  const resetUser = useResetRecoilState(UserInfoState)
  const resetToken = useResetRecoilState(UserTokenState)
  const LinkClickHandler: MouseEventHandler = (e) => {
    if ((e.target as HTMLElement).nodeName !== 'A') return
    setMoAsideToggle(false)
  }
  const LogoutHandler = async () => {
    const res = await LogoutFun()
    if (res?.status === 200) {
      resetUser()
      resetToken()
      toast.success('로그아웃되었습니다!')
      navigate('/')
    }
  }
  return (
    <div className='mobAside bg-base-200'>
      <IoMdClose onClick={() => setMoAsideToggle(false)} />
      <ul onClick={LinkClickHandler}>
        {saveduser ? (
          <>
            <li className='avatarLi'>
              <Avatar size={33} logged={true} />
            </li>
            <li>
              <Link to={'/'}>홈</Link>
            </li>
            <li>
              <Link to={'/write'}>글쓰기</Link>
            </li>
            <li>
              <Link to={`/blog/${user.accountName}`}>내 블로그</Link>
            </li>
            <li>
              <Link to={'/mypage'}>내 정보 수정</Link>
            </li>
            <li>
              <Link to={'/mypage'}>알림 내역</Link>
            </li>
            <li>
              <a href='#none' onClick={LogoutHandler}>
                로그아웃
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/'}>홈</Link>
            </li>
            <li>
              <Link to={'/login'}>로그인</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default MobAside
