import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { handleCopyClipBoard } from '../lib/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeLikeStatus, getLikeStatus } from '../lib/useQuery/getPost'
import { useEffect, useState } from 'react'
import { LikeState } from '../types/api'
import NotLoggedModal from './notLoggedModal'
const LikeAndShare = () => {
  const location = useLocation()
  const params = useParams()
  const [openModal, setModal] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { data } = useQuery<LikeState>({
    queryKey: ['posts', params.post, 'like'],
    queryFn: getLikeStatus,
  })
  const { mutate } = useMutation({
    mutationFn: changeLikeStatus,
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', params.post] })
    },
  })
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <ul className='likeAndShare'>
      <li
        onClick={() => {
          data?.likesStatus === 'NOT_LOGGED_IN'
            ? setModal(() => true)
            : mutate(params.post!)
        }}
      >
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
      {openModal && <NotLoggedModal setModal={setModal} />}
    </ul>
  )
}

export default LikeAndShare
