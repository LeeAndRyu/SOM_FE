import { toast } from 'react-toastify'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

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
    try {
      const res = await axiosInstance.delete(`/post/${postId}`)
      if (res.status === 200) {
        toast.success('삭제되었습니다')
        navigate(`/blog/${accountName}`)
        queryClient.invalidateQueries({ queryKey: ['blog', postId] })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <p className='postEditWrap'>
      <a className='link' onClick={() => navigate(`/edit/${postId}`)}>
        수정
      </a>
      <a className='link' onClick={deletePost}>
        삭제
      </a>
    </p>
  )
}

export default PostEdit
