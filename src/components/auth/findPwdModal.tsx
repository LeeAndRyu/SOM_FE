import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
import { LoginModalType } from '../../types/app'
type Formvalues = {
  email: string
  name: string
}

const FindPwdModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<LoginModalType>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'all' })
  const onSubmitHandler: SubmitHandler<Formvalues> = (e: any) => {
    console.log(e)
  }
  return (
    <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className='text-center text-xl'>비밀번호 찾기</h2>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>name</span>
        </label>
        <input
          type='text'
          placeholder='name'
          {...register('name', {
            required: '필수 입력 항목입니다',
          })}
          className={clsx(`input input-bordered mb-1.5`)}
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
          Send Email
        </button>
      </div>
    </form>
  )
}

export default FindPwdModal
