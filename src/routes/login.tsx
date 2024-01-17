import React, { useLayoutEffect, useState } from 'react'
import Modal from '../components/common/modal'
import LoginModal from '../components/auth/loginModal'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

const Login = () => {
  const [isLoaded, setLoaded] = useState(false)
  const onLoad = () => {
    setLoaded(true)
  }
  useLayoutEffect(() => {
    console.log(isLoaded)
  }, [isLoaded])
  return (
    <>
      <div id='fixedWrapper'>
        <Modal btnMessage='Login'>
          <LoginModal />
        </Modal>
        <Modal btnMessage='Sign Up'>
          <LoginModal />
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
