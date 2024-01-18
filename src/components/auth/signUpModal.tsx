import { useEffect, useState } from 'react'
import clsx from 'clsx'
const SignUpModal = () => {
  const [isCorrect, setCorrect] = useState(false)
  useEffect(() => {
    
  },[])
  return (
    <form className='card-body'>
      <h2 className='text-center text-xl'>회원가입</h2>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Name</span>
        </label>
        <input
          type='text'
          placeholder='name'
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
            isCorrect ? 'input-success' : 'input-error'
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
