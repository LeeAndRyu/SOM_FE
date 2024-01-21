import React, { useLayoutEffect, useState } from 'react'
import Modal from '../components/common/modal'
import LoginModal from '../components/auth/loginModal'
import SignUpModal from '../components/auth/signUpModal'
import { FaCircleArrowRight } from 'react-icons/fa6'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

const Login = () => {
  const [isLoaded, setLoaded] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(true)
  const onLoad = () => {
    setLoaded(true)
  }
  useLayoutEffect(() => {
    console.log(isLoaded)
  }, [isLoaded])
  return (
    <>
      <div id='fixedWrapper'>
        <Modal
          btnMessage='login'
          setReset={setShowLoginModal}
          arrow={<FaCircleArrowRight />}
        >
          <LoginModal
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </Modal>
        <Modal btnMessage='sign up' arrow={<FaCircleArrowRight />}>
          <SignUpModal />
        </Modal>
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
