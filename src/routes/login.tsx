import React, { useLayoutEffect, useState } from 'react'
import Modal from '../components/common/modal'
import LoginModal from '../components/auth/loginModal'
import SignUpModal from '../components/auth/signUpModal'
import { FaCircleArrowRight } from 'react-icons/fa6'
import { LoginModalType } from '../types/app'
import FindPwdModal from '../components/auth/findPwdModal'
import SendEmail from '../components/auth/sendEmail'
const Spline = React.lazy(() => import('@splinetool/react-spline'))

const Login = () => {
  const [isLoaded, setLoaded] = useState(false)
  const [showModal, setShowModal] = useState<LoginModalType>('login')
  const onLoad = () => {
    setLoaded(true)
  }
  useLayoutEffect(() => {
    console.log(isLoaded)
  }, [isLoaded])
  return (
    <>
      <div id='fixedWrapper'>
        <div className='LoginWrapinner'>
          {showModal === 'login' ? (
            <LoginModal setShowModal={setShowModal} />
          ) : showModal === 'signUp' ? (
            // <SignUpModal setShowModal={setShowModal} />
            <SendEmail setShowModal={setShowModal} />
          ) : (
            <FindPwdModal setShowModal={setShowModal} />
          )}
        </div>

        {/*         <Modal btnMessage='sign up' arrow={<FaCircleArrowRight />}>
          <SignUpModal />
        </Modal> */}
      </div>
      <React.Suspense fallback={<p className='infoP'>Loading...</p>}>
        <Spline
          onLoad={onLoad}
          scene='https://prod.spline.design/ZPVMtymnrM2oAeUA/scene.splinecode'
        />
      </React.Suspense>
    </>
  )
}

export default Login
