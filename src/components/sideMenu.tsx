import { Link, useNavigate } from 'react-router-dom'
import Avatar from './common/avatar'
import { getLocalStorage } from '../lib/localStorage'
import { LogoutFun } from '../lib/auth'
import { UserInfoState, UserTokenState } from '../store/user'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { toast } from 'react-toastify'
const SideMenu = () => {
  const savedUser = getLocalStorage('user')
  const navigate = useNavigate()
  const [user, _] = useRecoilState(UserInfoState)
  const resetUser = useResetRecoilState(UserInfoState)
  const resetToken = useResetRecoilState(UserTokenState)
  const LogoutHandler = async () => {
    await LogoutFun().then(() => {
      resetUser()
      resetToken()
      toast.success('로그아웃되었습니다!')
      navigate('/')
    })
  }
  return (
    <div id='sideMenuWrapper'>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        {savedUser ? (
          <>
            <li>
              <details open>
                <summary>
                  <Avatar size={23} logged={true} />
                </summary>
                <ul>
                  <li>
                    <Link to={'/'}>홈</Link>
                  </li>
                  <li>
                    <Link to={`/blog/${user.accountName}`}>내 블로그</Link>
                  </li>
                  <li>
                    <Link to={'/write'}>글쓰기</Link>
                  </li>
                  <li>
                    <details open>
                      <summary>마이페이지</summary>
                      <ul>
                        <li>
                          <Link to={'/mypage'}>내 정보수정</Link>
                        </li>
                        <li>
                          <Link to={'/'}>알림 내역</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to={'#none'} onClick={LogoutHandler}>
                로그아웃
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <details open>
                <summary>☁️</summary>
                <ul>
                  <li>
                    <Link to={'/'}>홈</Link>
                  </li>
                  <li>
                    <Link to={'/login'}>로그인</Link>
                  </li>
                </ul>
              </details>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default SideMenu
