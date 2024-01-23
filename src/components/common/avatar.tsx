import React from 'react'
import Image from '../../assets/basicProfile.png'
interface Prop {
  src?: string
  size?: number
}
const Avatar = ({ src, size }: Prop) => {
  return (
    <div
      className='avatar'
      style={{
        width: size ? size : 100,
        height: size ? size : 100,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',

          objectFit: 'cover',
          display: 'block',
        }}
        src={src ? src : Image}
      />
    </div>
  )
}

export default Avatar
