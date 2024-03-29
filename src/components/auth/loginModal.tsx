import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import WarningMsg from '../common/warningMsg'
import { LoginModalType } from '../../types/app'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../lib/axios'
import { LoginSuccess } from '../../lib/auth'
import { useRecoilState } from 'recoil'
import {
  NotificationState,
  UserInfoState,
  UserTokenState,
} from '../../store/user'
type Formvalues = {
  email: string
  password: string
}

const LoginModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<LoginModalType>>
}) => {
  const [_1, setUser] = useRecoilState(UserInfoState)
  const [_2, setToken] = useRecoilState(UserTokenState)
  const [_3, setNtExist] = useRecoilState(NotificationState)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'all' })
  const navigate = useNavigate()

  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    try {
      const res = await axiosInstance.post(`/login`, e)
      if (res.status === 200) {
        setToken(res.data.tokenResponse)
        setUser(res.data.member)
        checkUnreadMsg(res.data.tokenResponse.accessToken)
        await LoginSuccess(res.data)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const checkUnreadMsg = async (TOKEN: any) => {
    try {
      const res = await axiosInstance.get(`/notification/unread`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      if (res.status === 200) {
        res.data === true &&
          setNtExist((prev) => {
            return {
              ...prev,
              state: true,
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
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
              value: /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]{2,3}$/i,
              message: '유효한 이메일 형식이 아닙니다',
            },
          })}
          className={clsx(
            `input input-bordered mb-1.5`,
            errors.email && 'input-error'
          )}
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
                /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!?@#$%^&+=]).*$/,
              message: '8-16자 이내, 영문, 숫자, 특수 문자를 포함해주세요',
            },
          })}
          className={clsx(
            `input input-bordered mb-1.5`,
            errors.password && 'input-error'
          )}
        />
        {errors.password && errors.password.message && (
          <WarningMsg message={errors.password.message} />
        )}
        <label className='label'>

          <a
            onClick={() => setShowModal('signUp')}
            className='label-text-alt link link-hover'
          >
            Don't have an accout? ➤
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
