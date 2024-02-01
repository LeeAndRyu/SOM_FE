import { useRecoilState } from 'recoil'
import Image from '../../assets/avatar-1.jpg'
import { UserInfoState } from '../../store/user'
import { useNavigate } from 'react-router-dom'
import ErrorImage from '../../assets/error2.png'
interface Prop {
  src?: string
  logged?: boolean
  size?: number
  accountName?: string
}
const Avatar = ({ src, size, logged, accountName }: Prop) => {
  const [user, _] = useRecoilState(UserInfoState)
  const navigate = useNavigate()
  return (
    <div
      onClick={() =>
        logged
          ? navigate(`/blog/${user.accountName}`)
          : accountName
            ? navigate(`/blog/${accountName}`)
            : null
      }
      className='avatar'
      style={{
        width: size ? size : 100,
        height: size ? size : 100,
        borderRadius: '50%',
        cursor: 'pointer',
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
        onError={(e) => (e.currentTarget.src = ErrorImage)}
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
