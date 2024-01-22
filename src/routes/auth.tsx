import React, { useEffect, useState } from 'react'
import Bgimg from '../assets/emoji.png'
import { useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'
import WarningMsg from '../components/common/warningMsg'
type Formvalues = {
  name: string
  password: string
  verifyPwd: string
}
const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [code, setCode] = useState<null | string>(null)
  const [email, setEmail] = useState<null | string>(null)
  const {
    register,
    getValues,
    handleSubmit,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'all' })
  const onSubmitHandler: SubmitHandler<Formvalues> = (e: any) => {
    console.log(e)
  }
  const isItValidCSS = (type: keyof Formvalues) => {
    return !getFieldState(type).isTouched
      ? ''
      : getFieldState(type).invalid
        ? 'input-error'
        : 'input-success'
  }
  useEffect(() => {
    setCode(searchParams.get('code'))
    setEmail(searchParams.get('email'))
  }, [])
  return (
    <>
      <img className='bgImg' src={Bgimg} />
      <div id='fixedWrapper'>
        <div className='LoginWrapinner'>
          <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
            <h2 className='text-center text-xl'>추가 정보 입력</h2>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='name'
                {...register('name', {
                  required: '필수 입력 항목입니다',
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('name')
                )}
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
                value={email!}
                disabled
                className={`input input-bordered mb-1.5`}
              />
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
                    message:
                      '8-16자 이내, 영문, 숫자, 특수 문자를 포함해주세요',
                  },
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('password')
                )}
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
                placeholder='verify password'
                {...register('verifyPwd', {
                  required: '필수 입력 항목입니다',
                  validate: {
                    value: (value) => {
                      const { password } = getValues()
                      return (
                        password === value || '비밀번호가 일치하지 않습니다'
                      )
                    },
                  },
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('verifyPwd')
                )}
              />
              {errors.verifyPwd && errors.verifyPwd.message && (
                <WarningMsg message={errors.verifyPwd.message} />
              )}
            </div>
            <div className='form-control mt-6'>
              <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary'
              >
                Create one
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
