import { Outlet, Link, useLocation } from 'react-router-dom'
import ThemeToggle from './themeToggle'
import SideMenu from './sideMenu'
import { useNavigate } from 'react-router-dom'
import { IoCloudSharp } from 'react-icons/io5'
import 'react-toastify/dist/ReactToastify.css'
import MobAside from './mobAside'
import { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserInfoState, UserTokenState } from '../store/user'
import {
  getAccessToken,
  getLocalStorage,
  getRefreshToken,
} from '../lib/localStorage'
import RQProvider from './rqProvider'
import { HeadLinkState } from '../store/app'
import { SseComponent } from './sseComponent'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const saveduser = getLocalStorage('user')
  const savedAccessToken = getAccessToken()
  const savedRefreshToken = getRefreshToken()
  const [alink, _] = useRecoilState(HeadLinkState)
  const resetAlink = useResetRecoilState(HeadLinkState)
  const [moAsideToggle, setMoAsideToggle] = useState(false)
  const [_2, setUser] = useRecoilState(UserInfoState)
  const [_token, setToken] = useRecoilState(UserTokenState)
  const userInfo = JSON.parse(getLocalStorage('user')!)
  useEffect(() => {
    userInfo !== null && setUser(() => userInfo)
    savedAccessToken !== null &&
      savedRefreshToken !== null &&
      setToken((prev) => {
        return {
          ...prev,
          accessToken: savedAccessToken,
          refreshToken: savedRefreshToken,
        }
      })
  }, [])
  useEffect(() => {
    if (!location.pathname.includes('blog')) {
      resetAlink()
    }
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <RQProvider>
      <div id='wrap' className='bg-base-100'>
        <header id='header'>
          <div className='headInner'>
            <div className='navbar'>
              <div className='navbar-start'>
                <div className='mobHam' onClick={() => setMoAsideToggle(true)}>
                  {' '}
                  <span
                    tabIndex={0}
                    role='button'
                    className='btn btn-ghost btn-circle'
                  >
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
                        d='M4 6h16M4 12h16M4 18h7'
                      />
                    </svg>
                  </span>
                </div>

                {moAsideToggle && (
                  <MobAside setMoAsideToggle={setMoAsideToggle} />
                )}
                <div className='dropdown'>
                  <span
                    tabIndex={0}
                    role='button'
                    className='btn btn-ghost btn-circle'
                  >
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
                        d='M4 6h16M4 12h16M4 18h7'
                      />
                    </svg>
                  </span>
                  <ul className='dropdown-content'>
                    <SideMenu />
                  </ul>
                </div>
                <>
                  <Link to={alink.path} className='btn btn-ghost text-xl'>
                    {alink.path !== '/' && <IoCloudSharp />}
                    <span>{alink.content}</span>
                  </Link>
                </>
              </div>
              <div className='navbar-center'></div>
              <div className='navbar-end'>
                <button
                  onClick={() => navigate('/search')}
                  className='btn nofocus btn-ghost btn-circle'
                >
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
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
                {saveduser && <SseComponent />}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
        <main id='main'>
          <div className='inner'>
            <Outlet />
          </div>
        </main>
      </div>
    </RQProvider>
  )
}

export default Layout
