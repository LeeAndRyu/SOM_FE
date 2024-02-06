import React, { useEffect, useState } from 'react'

import LoginModal from '../components/auth/loginModal'

import { LoginModalType } from '../types/app'
import FindPwdModal from '../components/auth/findPwdModal'
import SendEmail from '../components/auth/sendEmail'
import { getLocalStorage } from '../lib/localStorage'
import { useNavigate } from 'react-router-dom'
const Spline = React.lazy(() => import('@splinetool/react-spline'))
const Login = () => {
  const [showModal, setShowModal] = useState<LoginModalType>('login')
  const navigate = useNavigate()
  const user = getLocalStorage('user')
  useEffect(() => {
    if (!!user) {
      navigate('/')
      return
    }
  }, [])
  return (
    <>
      <div id='fixedWrapper'>
        <div className='LoginWrapinner'>
          {showModal === 'login' ? (
            <LoginModal setShowModal={setShowModal} />
          ) : showModal === 'signUp' ? (
            <SendEmail setShowModal={setShowModal} />
          ) : (
            <FindPwdModal setShowModal={setShowModal} />
          )}
        </div>
      </div>
      <React.Suspense fallback={<p className='infoP'>Loading...</p>}>
        <Spline scene='https://prod.spline.design/ZPVMtymnrM2oAeUA/scene.splinecode' />
      </React.Suspense>
    </>
  )
}

export default Login
