import { useEffect, useState } from 'react'
import Bgimg from '../assets/emoji.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'
import WarningMsg from '../components/common/warningMsg'
import axios from 'axios'
import { getLocalStorage } from '../lib/localStorage'
import { toast } from 'react-toastify'
type Formvalues = {
  accountName: string
  nickname: string
  introduction: string
  password: string
  verifyPwd: string
}
const Auth = () => {
  const user = getLocalStorage('user')
  const [searchParams, _setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [code, setCode] = useState<null | string>(null)
  const [email, setEmail] = useState<null | string>(null)
  const {
    register,
    getValues,
    handleSubmit,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<Formvalues>({ mode: 'all' })
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    if (!code) return
    try {
      const res = await axios.post(
        `https://118.67.142.194.nip.io/register?code=${code}`,
        {
          accountName: e.accountName,
          introduction: e.introduction,
          nickname: e.nickname,
          password: e.password,
        }
      )

      if (res.status === 200) {
        if (confirm('회원가입 성공! 로그인 하시겠습니까?')) {
          navigate('/login')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isItValidCSS = (type: keyof Formvalues) => {
    return !getFieldState(type).isTouched
      ? ''
      : getFieldState(type).invalid
        ? 'input-error'
        : 'input-success'
  }

  useEffect(() => {
    if (!!user) {
      toast.error('이미 로그인된 유저입니다')
      navigate('/')
      return
    }
    setCode(searchParams.get('code'))
    setEmail(searchParams.get('email'))
  }, [])
  return (
    <>
      <img className='bgImg' src={Bgimg} />
      <div id='fixedWrapper'>
        <div className='LoginWrapinner'>
          <form className='card-body' onSubmit={handleSubmit(onSubmitHandler)}>
            <h2 className='text-center text-xl'>회원가입</h2>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>계정명</span>
              </label>
              <input
                type='text'
                placeholder='계정명을 입력하세요'
                {...register('accountName', {
                  required: '필수 입력 항목입니다',
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('accountName')
                )}
                required
              />
              {errors.accountName && errors.accountName.message && (
                <WarningMsg message={errors.accountName.message} />
              )}
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>이름</span>
              </label>
              <input
                type='text'
                placeholder='닉네임을 입력하세요'
                {...register('nickname', {
                  required: '필수 입력 항목입니다',
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('nickname')
                )}
                required
              />
              {errors.nickname && errors.nickname.message && (
                <WarningMsg message={errors.nickname.message} />
              )}
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>한 줄 소개</span>
              </label>
              <input
                type='text'
                placeholder='소개글을 입력하세요'
                {...register('introduction', {
                  required: '필수 입력 항목입니다',
                })}
                className={clsx(
                  `input input-bordered mb-1.5`,
                  isItValidCSS('introduction')
                )}
                required
              />
              {errors.introduction && errors.introduction.message && (
                <WarningMsg message={errors.introduction.message} />
              )}
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>이메일</span>
              </label>
              <input
                type='email'
                placeholder='이메일'
                value={email!}
                disabled
                className={`input input-bordered mb-1.5`}
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>비밀번호</span>
              </label>
              <input
                type='password'
                placeholder='비밀번호'
                {...register('password', {
                  required: '필수 입력 항목입니다',
                  pattern: {
                    value:
                      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!?@#$%^&+=]).*$/,
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
                <span className='label-text'>비밀번호 재확인</span>
              </label>
              <input
                type='password'
                placeholder='비밀번호 재확인'
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
