import React from 'react'
import SignUpModal from '../components/auth/signUpModal'
import Bgimg from '../assets/emoji.png'
const Auth = () => {
  return (
    <>
      <img className='bgImg' src={Bgimg} />

      <div id='fixedWrapper'>
        <div className='LoginWrapinner'>
          <SignUpModal />
        </div>
      </div>
    </>
  )
}

export default Auth
