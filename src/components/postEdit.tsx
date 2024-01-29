import { toast } from 'react-toastify'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router-dom'

const PostEdit = ({
  postId,
  accountName,
}: {
  accountName: string
  postId: string
}) => {
  const navigate = useNavigate()
  const deletePost = async () => {
    try {
      const res = await axiosInstance.delete(`/post/${postId}`)
      if (res.status === 200) {
        toast.success('삭제되었습니다')
        navigate(`/blog/${accountName}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='postEditWrap'>
      <a className='link'>수정</a>
      <a className='link' onClick={deletePost}>삭제</a>
    </div>
  )
}

export default PostEdit
