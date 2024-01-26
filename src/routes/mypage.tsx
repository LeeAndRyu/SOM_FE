import { FormEventHandler, useRef, useState } from 'react'
import Image from '../assets/basicProfile.png'
import Button from '../components/common/button'
import { toast } from 'react-toastify'
import { axiosInstance } from '../lib/axios'
import { useRecoilState } from 'recoil'
import { UserInfoState } from '../store/user'
import { setLocalStorage } from '../lib/localStorage'
const Mypage = () => {
  // const [imgSrc, _setImgSrc] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [imageFile, setImageFile] = useState<File[] | null>([])
  const [user, setUser] = useRecoilState(UserInfoState)
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
  return (
    <div className='mypage'>
      <div className='profile_sec'>
        <div className='profileImage'>
          <img src={user.profileImage ? user.profileImage : Image} />
        </div>
        <form onSubmit={profileSubmitHandler}>
          <input
            // style={{ display: 'none' }}
            type='file'
            name='profileImage'
            id='profileImage'
            ref={fileInput}
            onChange={profileOnChangeHander}
            className='file-input file-input-bordered file-input-secondary w-full max-w-xs'
          />
          <Button type='submit' btnClass=''>
            변경하기
          </Button>
          <Button
            type='button'
            btnClass='neutral'
            onClick={profileDeleteHander}
          >
            이미지 삭제
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Mypage
