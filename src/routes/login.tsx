import React, { useEffect, useLayoutEffect, useState } from 'react'
import Modal from '../components/common/modal'
import LoginModal from '../components/auth/loginModal'
import LoadingScreen from '../components/loading'
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
        <Modal btnMessage='LOGIN'>
          <LoginModal />
        </Modal>
        <Modal btnMessage='SIGN UP'>
          <LoginModal />
        </Modal>
      </div>
      <React.Suspense fallback={<LoadingScreen />}>
        <Spline
          onLoad={onLoad}
          scene='https://prod.spline.design/ZPVMtymnrM2oAeUA/scene.splinecode'
        />
      </React.Suspense>
    </>
  )
}

export default Login
