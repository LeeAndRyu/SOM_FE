import { useRef, useState } from 'react'
import { CommentItem as ItemType } from '../types/api'
import Avatar from './common/avatar'
import Button from './common/button'
import dayjs from 'dayjs'
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import { useRecoilState } from 'recoil'
import { UserInfoState } from '../store/user'
interface Prop {
  item: ItemType
}
export const CommentItem = ({ item }: Prop) => {
  const [editMode, setEditMode] = useState(false)
  const queryClient = useQueryClient()
  const params = useParams()
  const [user, _set] = useRecoilState(UserInfoState)
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const cancleMode = () => {
    setEditMode(false)
  }
  const putComment = async (content: string) => {
    const res = await axiosInstance.put(`/comment/${item.commentId}`, {
      content,
    })
    return res
  }
  const deleteComment = async () => {
    const res = await axiosInstance.delete(`/comment/${item.commentId}`)
    return res
  }
  const { mutate } = useMutation({
    mutationFn: putComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comment', params.post],
      })
      setEditMode(false)
    },
    onError: (e) => console.log(e),
  })
  const { mutate: deleteMute } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comment', params.post],
      })
      setEditMode(false)
    },
    onError: (e) => console.log(e),
  })
  return (
    <li>
      <div className='userInfo'>
        <Avatar size={50} src={item.writerProfileImage} />
        <p className='username'>
          <span className='userNick'>{item.writerNickname}</span>
          <p className='info'>
            <span className='date'>
              {dayjs(item.registeredAt).format('YYYY-MM-DD')}
            </span>
            {item.writerAccountName === user.accountName && (
              <span className='edit'>
                <RiEdit2Line
                  className='hoverAct'
                  onClick={() => setEditMode(true)}
                />
                <RiDeleteBinLine
                  className='hoverAct'
                  onClick={() => deleteMute()}
                />
              </span>
            )}
          </p>
        </p>
      </div>
      <div className='cont'>
        {editMode ? (
          <>
            <textarea
              ref={textRef}
              className='textarea textarea-bordered'
              placeholder='Bio'
              defaultValue={item.content}
            />
            <div>
              <Button onClick={cancleMode}>취소</Button>
              <Button
                btnClass='primary'
                onClick={() => textRef.current && mutate(textRef.current.value)}
              >
                수정
              </Button>
            </div>
          </>
        ) : (
          <p>{item.content}</p>
        )}
      </div>
    </li>
  )
}

export const CommentInput = () => {
  const params = useParams()
  const [text, setText] = useState('')
  const queryClient = useQueryClient()
  const postComment = (content: string) => {
    const res = axiosInstance
      .post(`/post/${params.post}/comment`, { content })
      .then((res) => res.data)
    return res
  }
  const { mutate } = useMutation({
    mutationFn: postComment,
    mutationKey: ['post', 'comment', params.post],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comment', params.post],
      })
      setText('')
    },
    onError: (e) => {
      console.log(e)
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutate(text)
      }}
    >
      <textarea
        placeholder='댓글을 입력해주세요!'
        className='textarea textarea-bordered textarea-lg w-full'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button type='submit' btnClass='primary'>
        댓글 작성
      </Button>
    </form>
  )
}
