import { Outlet, Link, useParams } from 'react-router-dom'
import ThemeToggle from './themeToggle'
import SideMenu from './sideMenu'
import { useNavigate } from 'react-router-dom'
import { IoCloudSharp } from 'react-icons/io5'
import 'react-toastify/dist/ReactToastify.css'
const Layout = () => {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <>
      <div id='wrap' className='bg-base-100'>
        <header id='header'>
          <div className='headInner'>
            <div className='navbar'>
              <div className='navbar-start'>
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
                <Link to='/' className='btn btn-ghost text-xl'>
                  {params.id ? (
                    <>
                      <IoCloudSharp />
                      {params.id}
                    </>
                  ) : (
                    <>S&nbsp;☻&nbsp;M</>
                  )}
                </Link>
              </div>
              <div className='navbar-center'></div>

              <div className='navbar-end'>
                <ThemeToggle />
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

                <button className='btn btn-ghost nofocus btn-circle'>
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
                    <span className='badge badge-xs badge-primary indicator-item'></span>
                  </div>
                </button>
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
    </>
  )
}

export default Layout
