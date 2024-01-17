import Spline from '@splinetool/react-spline';
import React from 'react';
import Modal from '../components/common/modal';
import LoginModal from '../components/auth/loginModal';

const Login = () => {
  return (
    <>
      <div id='fixedWrapper'>
        <Modal btnMessage='Login'>
          <LoginModal />
        </Modal>
        <Modal btnMessage='SignUp'>
          <LoginModal />
        </Modal>
      </div>
      <React.Suspense
        fallback={
          <img src='https://my.spline.design/draganddropkitchencopy-06e36551873995c01d424723c1311d27/' />
        }
      >
        <Spline
          // ref={objectToAnimate}
          scene='https://prod.spline.design/ZPVMtymnrM2oAeUA/scene.splinecode'
        />
      </React.Suspense>
    </>
  );
};

export default Login;
