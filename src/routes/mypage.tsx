import { FormEventHandler, useEffect, useRef, useState } from 'react'
import Image from '../assets/avatar-1.jpg'
import Button from '../components/common/button'
import { toast } from 'react-toastify'
import { axiosInstance } from '../lib/axios'
import { useRecoilState } from 'recoil'
import { UserInfoState } from '../store/user'
import { setLocalStorage } from '../lib/localStorage'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'
import Title from '../components/common/title'
import EditPwd from '../components/auth/editPwd'
type Formvalues = {
  blogName: string
  introduction: string
  nickname: string
}
const Mypage = () => {
  // const [imgSrc, _setImgSrc] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [imageFile, setImageFile] = useState<File[] | null>([])
  const [user, setUser] = useRecoilState(UserInfoState)
  const { register, handleSubmit } = useForm<Formvalues>({
    mode: 'all',
    defaultValues: {
      blogName: user.blogName,
      introduction: user.introduction,
      nickname: user.nickname,
    },
  })
  useEffect(() => {
    console.log(user)
  }, [])
  const profileOnChangeHander = (e: any) => {
    setImageFile(Array.from(e.target.files))
  }
  const profileSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault()
    if (fileInput.current) fileInput.current.value = ''
    if (imageFile == null || imageFile.length < 1) {
      toast.warning('이미지를 업로드해주세요')
      return
    }
    const formData = new FormData()
    try {
      formData.append('profileImage', imageFile[0])
      const res = await axiosInstance.put(`/member/profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          credentials: 'include',
          // Authorization: `Bearer ${userToken.accessToken}`,
        },
      })
      if (res.status === 200) {
        setUser(res.data)
        setLocalStorage('user', res.data)
        toast.success('프로필이 변경되었습니다!')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const profileDeleteHander = async () => {
    try {
      const res = await axiosInstance.delete('/member/profile-image/remove')
      if (res.status === 200) {
        setUser(res.data)
        setLocalStorage('user', res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    console.log(e)
    try {
      const res = await axiosInstance.put(`/member`, e)
      if (res.status === 200) {
        setUser(res.data)
        setLocalStorage('user', res.data)
        toast.success('저장되었습니다!')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='mypage '>
      <Title title='내 정보 수정' />
      <div className='profile_sec'>
        <div className='profileImage'>
          <img src={user.profileImage ? user.profileImage : Image} />
        </div>
        <form onSubmit={profileSubmitHandler}>
          <input
            type='file'
            name='profileImage'
            id='profileImage'
            ref={fileInput}
            onChange={profileOnChangeHander}
            className='file-input file-input-bordered w-full max-w-xs'
          />
          <div className='btnWrap'>
            {/* <button className='btn btn-secondary'>dd</button> */}
            <Button
              type='button'
              btnClass='neutral'
              onClick={profileDeleteHander}
            >
              이미지 삭제
            </Button>
            <Button type='submit' btnClass='secondary'>
              변경하기
            </Button>
          </div>
        </form>
      </div>

      <div className='blogInfo_sec'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor='blogName'>블로그명</label>
            <input
              type='text'
              placeholder='상단에 보여질 블로그명을 입력하세요'
              {...register('blogName', {
                required: '필수 입력 항목입니다',
              })}
              className={clsx(`input input-bordered mb-1.5`)}
              required
            />
          </div>
          <div>
            <label htmlFor='nickname'>닉네임</label>
            <input
              type='text'
              placeholder='닉네임을 입력하세요'
              {...register('nickname', {
                required: '필수 입력 항목입니다',
              })}
              className={clsx(`input input-bordered mb-1.5`)}
              required
            />
          </div>
          <div>
            <label htmlFor='introduction'>한 줄 소개</label>
            <input
              type='text'
              placeholder='한 줄 소개'
              {...register('introduction', {
                required: '필수 입력 항목입니다',
              })}
              className={clsx(`input input-bordered mb-1.5`)}
              required
            />
          </div>
          <div>
            <Button btnClass='secondary' type='submit'>
              변경된 내용 저장
            </Button>
          </div>
        </form>
      </div>
      <Title title='비밀번호 수정' />
      <EditPwd />
    </div>
  )
}

export default Mypage
