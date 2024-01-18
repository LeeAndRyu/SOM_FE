import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
type Formvalues = {
  name: string
  email: string
  password: string
  confirmPwd: string
}
const SignUpModal = () => {
  const [isCorrect, setCorrect] = useState(false)
  const [isTyping, setTyping] = useState(false)
  const [finished, setFinished] = useState(false)
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    getFieldState,
    setFocus,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'onBlur' })
  const onSubmitHandler: SubmitHandler<Formvalues> = (e: any) => {
    console.log(e)
  }

  const isItPassed = (type: keyof Formvalues) => {
    getFieldState(type)
  }

  useEffect(() => {
    // console.log({ isValid } = watch('confirmPwd'))
  }, [watch])
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
          {...register('email', {
            required: '필수 입력 항목입니다',
            pattern: {
              value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i,
              message: '유효한 이메일 형식이 아닙니다',
            },
          })}
          className='input input-bordered'
        />
        {errors.email && errors.email.message && (
          <WarningMsg message={errors.email.message} />
        )}
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='password'
          {...register('password', {
            required: '필수 입력 항목입니다',
            pattern: {
              value:
                /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
              message: '8-16자 이내, 영문, 숫자, 특수 문자를 포함해주세요',
            },
          })}
          className='input input-bordered mb-1.5 info-success'
        />
        {errors.password && errors.password.message && (
          <WarningMsg message={errors.password.message} />
        )}
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Confirm Password</span>
        </label>
        <input
          type='password'
          placeholder='confirm password'
          {...register('confirmPwd', {
            required: '필수 입력 항목입니다',
            validate: {
              value: (value) => {
                const { password } = getValues()
                return password === value || '비밀번호가 일치하지 않습니다'
              },
            },
          })}
          className={clsx(
            `input input-bordered mb-1.5`,
            isTyping ? (isCorrect ? 'input-success' : 'input-error') : ''
          )}
        />
        {errors.confirmPwd && errors.confirmPwd.message && (
          <WarningMsg message={errors.confirmPwd.message} />
        )}

        <p>{getFieldState('confirmPwd').invalid && 'touched'}</p>
      </div>
      <div className='form-control mt-6'>
        <button disabled={!isValid} className='btn btn-primary'>
          Create one
        </button>
      </div>
    </form>
  )
}

export default SignUpModal
