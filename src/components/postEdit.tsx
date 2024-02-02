import { toast } from 'react-toastify'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const PostEdit = ({
  postId,
  accountName,
}: {
  accountName: string
  postId: string
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deletePost = async () => {
    const res = await axiosInstance.delete(`/post/${postId}`)
    return res
  }
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success('삭제되었습니다')
      navigate(`/blog/${accountName}`)
      queryClient.invalidateQueries({ queryKey: ['blog', postId] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <p className='postEditWrap'>
      <a className='link' onClick={() => navigate(`/edit/${postId}`)}>
        수정
      </a>
      <a className='link' onClick={() => mutate()}>
        삭제
      </a>
    </p>
  )
}

export default PostEdit
