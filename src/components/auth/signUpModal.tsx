import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
type Formvalues = {
  name: string
  email: string
  password: string
}
const SignUpModal = () => {
  const [isCorrect, setCorrect] = useState(false)
  const [isTyping, setTyping] = useState(false)
  const [pwdConfirm, setPwdpwdConfirm] = useState('')
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Formvalues>({ mode: 'onBlur' })
  const onSubmitHandler: SubmitHandler<Formvalues> = (e: any) => {
    console.log(e)
  }

  return (
    <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className='text-center text-xl'>회원가입</h2>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Name</span>
        </label>
        <input
          type='text'
          placeholder='name'
          {...register('name', {
            required: '필수 입력 항목입니다',
            pattern: {
              // input의 정규식 패턴
              value: /^[A-za-z0-9가-힣]{3,10}$/,
              message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
            },
          })}
          className='input input-bordered'
          required
        />
        {errors.name && errors.name.message && (
          <WarningMsg message={errors.name.message} />
        )}
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          type='email'
          placeholder='email'
          {...register('email', { required: '필수 입력 항목입니다' })}
          className='input input-bordered'
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='password'
          {...register('password', { required: '필수 입력 항목입니다' })}
          className='input input-bordered mb-1.5 info-success'
          required
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Confirm Password</span>
        </label>
        <input
          type='password'
          placeholder='confirm password'
          onChange={(e) => setPwdpwdConfirm(e.target.value)}
          className={clsx(
            `input input-bordered mb-1.5`,
            isTyping ? (isCorrect ? 'input-success' : 'input-error') : ''
          )}
          required
        />
      </div>
      <div className='form-control mt-6'>
        <button className='btn btn-primary'>Create one</button>
      </div>
    </form>
  )
}

export default SignUpModal
