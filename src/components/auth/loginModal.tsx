import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
type Formvalues = {
  email: string
  password: string
}

const LoginModal = () => {
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
    <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className='text-center text-xl'>로그인</h2>
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
          className={clsx(
            `input input-bordered mb-1.5`,
            getFieldState('password').isTouched &&
              getFieldState('password').invalid &&
              'input-error'
          )}
        />
        {errors.password && errors.password.message && (
          <WarningMsg message={errors.password.message} />
        )}
        <label className='label'>
          <a href='#' className='label-text-alt link link-hover'>
            Forgot password?
          </a>
        </label>
      </div>
      <div className='form-control mt-6'>
        <button disabled={!isValid} className='btn btn-primary'>
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginModal
