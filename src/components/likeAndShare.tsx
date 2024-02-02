import { FaRegHeart, FaShareAlt } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { handleCopyClipBoard } from '../lib/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getLikeStatus } from '../lib/useQuery/getPost'
import { useEffect } from 'react'
import { LikeState } from '../types/api'
const LikeAndShare = () => {
  const location = useLocation()
  const params = useParams()
  const { data } = useQuery<LikeState>({
    queryKey: ['post', 'like', params.post],
    queryFn: getLikeStatus,
  })
  useMutation
  useEffect(()=>{console.log(data)},[])
  return (
    <ul className='likeAndShare'>
      <li>
        <FaRegHeart className='hoverAct' />
      </li>
      <li>
        <FaShareAlt
          className='hoverAct'
          onClick={() =>
            handleCopyClipBoard(
              import.meta.env.VITE_PUBLIC_BASE_URL + location.pathname
            )
          }
        />
      </li>
    </ul>
  )
}

export default LikeAndShare
