import Spline from '@splinetool/react-spline';
import React from 'react';
import styled from 'styled-components';
const FixedWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 30px;
`;
const Login = () => {
  return (
    <>
      <FixedWrapper>
        <div className='hero'>
          <div className='hero-content flex-col'>
            <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form className='card-body'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='email'
                    className='input input-bordered'
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='password'
                    className='input input-bordered'
                    required
                  />
                  <label className='label'>
                    <a href='#' className='label-text-alt link link-hover'>
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FixedWrapper>
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
