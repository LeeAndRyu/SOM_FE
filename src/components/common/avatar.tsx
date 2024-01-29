import { useRecoilState } from 'recoil'
import Image from '../../assets/avatar-1.jpg'
import { UserInfoState } from '../../store/user'
import { useEffect } from 'react'
interface Prop {
  src?: string
  logged?: boolean
  size?: number
}
const Avatar = ({ src, size, logged }: Prop) => {
  const [user, _] = useRecoilState(UserInfoState)
  useEffect(() => {
    // logged === true && console.log(user)
  }, [])
  return (
    <div
      className='avatar'
      style={{
        width: size ? size : 100,
        height: size ? size : 100,
        borderRadius: '50%',
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
        }}
        src={
          logged
            ? user.profileImage
              ? user.profileImage
              : Image
            : src
              ? src
              : Image
        }
      />
    </div>
  )
}

export default Avatar
