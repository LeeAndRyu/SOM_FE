import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../lib/axios'
import WarningMsg from '../common/warningMsg'
import Button from '../common/button'
type Formvalues = {
  currentPassword: string
  newPassword: string
  newPasswordCheck: string
}
const EditPwd = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Formvalues>({
    mode: 'all',
  })
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    console.log(e)
    try {
      const res = await axiosInstance.put(`/member/edit-password`, e)
      if (res.status === 200) {
        toast.success('비밀번호가 변경되었습니다')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='editPwd_sec'>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <input
            type='password'
            placeholder='현재 비밀번호'
            {...register('currentPassword', {
              required: '필수 입력 항목입니다',
              pattern: {
                value:
                  /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!?@#$%^&+=]).*$/,
                message: '8-16자 이내, 영문, 숫자, 특수 문자를 포함해주세요',
              },
            })}
            className={`input input-bordered mb-1.5`}
            required
          />
          {errors.currentPassword && errors.currentPassword.message && (
            <WarningMsg message={errors.currentPassword.message} />
          )}
        </div>
        <div>
          <input
            type='password'
            placeholder='새 비밀번호'
            {...register('newPassword', {
              required: '필수 입력 항목입니다',
              pattern: {
                value:
                  /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!?@#$%^&+=]).*$/,
                message: '8-16자 이내, 영문, 숫자, 특수 문자를 포함해주세요',
              },
            })}
            className={`input input-bordered mb-1.5`}
            required
          />
          {errors.newPassword && errors.newPassword.message && (
            <WarningMsg message={errors.newPassword.message} />
          )}
        </div>
        <div>
          <input
            type='password'
            placeholder='새 비밀번호 확인'
            {...register('newPasswordCheck', {
              required: '필수 입력 항목입니다',
              validate: {
                value: (value) => {
                  const { newPassword } = getValues()
                  return newPassword === value || '비밀번호가 일치하지 않습니다'
                },
              },
            })}
            className={`input input-bordered mb-1.5`}
            required
          />
          {errors.newPasswordCheck && errors.newPasswordCheck.message && (
            <WarningMsg message={errors.newPasswordCheck.message} />
          )}
        </div>
        <div>
          <Button btnClass='secondary' type='submit'>
            비밀번호 변경
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditPwd
