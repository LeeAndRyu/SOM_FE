import React, { MouseEventHandler, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './common/avatar'
import { IoMdClose } from 'react-icons/io'
interface Prop {
  setMoAsideToggle: React.Dispatch<React.SetStateAction<boolean>>
}
const MobAside = ({ setMoAsideToggle }: Prop) => {
  const [isItLogged, _setLogged] = useState(true)
  const LinkClickHandler: MouseEventHandler = (e) => {
    if ((e.target as HTMLElement).nodeName !== 'A') return
    setMoAsideToggle(false)
  }
  return (
    <div className='mobAside bg-base-200'>
      <IoMdClose onClick={() => setMoAsideToggle(false)} />
      <ul onClick={LinkClickHandler}>
        {isItLogged ? (
          <>
            <li className='avatarLi'>
              <Avatar size={23} logged={true} />
            </li>
            <li>
              <Link to={'/blog/nara'}>내 블로그</Link>
            </li>
            <li>
              <Link to={'/write'}>글쓰기</Link>
            </li>
            <li>
              <Link to={'/login'}>로그아웃</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}>홈</Link>
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
