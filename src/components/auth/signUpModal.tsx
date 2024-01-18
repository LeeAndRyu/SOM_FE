import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
const SignUpModal = () => {
  const [isCorrect, setCorrect] = useState(false)
  const [isTyping, setTyping] = useState(false)
  const { register, getValues, handleSubmit } = useForm()
  const onSubmitHandler = (e: any) => {}
  const onChangeHandler = () => {
    setTyping(true)
  }
  useEffect(() => {
    const pwdValue = getValues('password')
    console.log(pwdValue)
    console.log()
  }, [])
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
          {...register('name')}
          className='input input-bordered'
          required
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          type='email'
          placeholder='email'
          {...register('email')}
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
          {...register('password')}
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
          className={clsx(
            `input input-bordered mb-1.5`,
            isTyping ? (isCorrect ? 'input-success' : 'input-error') : ''
          )}
          // required
        />
      </div>
      <div className='form-control mt-6'>
        <button className='btn btn-primary'>Create one</button>
      </div>
    </form>
  )
}

export default SignUpModal
