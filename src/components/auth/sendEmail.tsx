import clsx from 'clsx'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
import { LoginModalType } from '../../types/app'
type Formvalues = {
  email: string
}
const SendEmail = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<LoginModalType>>
}) => {
  const [sendingEmail, setSendingEmail] = useState(false)
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'all' })
  const onSubmitHandler: SubmitHandler<Formvalues> = (e: any) => {
    console.log(e)
  }
  return (
    <>
      {!sendingEmail ? (
        <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
          <h2 className='text-center text-xl'>회원가입</h2>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email'
              {...register('email', {
                required: '필수 입력 항목입니다',
                pattern: {
                  value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i,
                  message: '유효한 이메일 형식이 아닙니다',
                },
              })}
              className={clsx(`input input-bordered mb-1.5`)}
            />
            {errors.email && errors.email.message && (
              <WarningMsg message={errors.email.message} />
            )}
          </div>
          <label className='label'>
            <a
              onClick={() => setShowModal('login')}
              className='label-text-alt link link-hover'
            >
              Back to Login ➤
            </a>
          </label>
          <div className='form-control mt-6'>
            <button disabled={!isValid} className='btn btn-primary'>
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className='card-body'>
          <h2 className='text-center text-xl'>인증 메일 전송! 🚀</h2>
          <div role='alert' className='alert alert-success'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>지금 바로 메일함을 확인해주세요!</span>
          </div>
        </div>
      )}
    </>
  )
}

export default SendEmail
