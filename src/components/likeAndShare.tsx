import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { handleCopyClipBoard } from '../lib/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeLikeStatus, getLikeStatus } from '../lib/useQuery/getPost'
import { useEffect } from 'react'
import { LikeState } from '../types/api'
const LikeAndShare = () => {
  const location = useLocation()
  const params = useParams()
  const queryClient = useQueryClient()
  const { data } = useQuery<LikeState>({
    queryKey: ['post', 'like', params.post],
    queryFn: getLikeStatus,
  })
  const { mutate } = useMutation({
    mutationFn: changeLikeStatus,
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', params.post] })
    },
  })
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <ul className='likeAndShare'>
      <li onClick={() => mutate(params.post!)}>
        {data?.likesStatus === 'LIKES' ? (
          <FaHeart className='hoverAct fill-primary' />
        ) : (
          <FaRegHeart className='hoverAct' />
        )}
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
