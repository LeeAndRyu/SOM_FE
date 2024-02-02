import { useParams } from 'react-router-dom'
import { CommentInput, CommentItem } from './commentItem'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '../lib/useQuery/getPost'
import { CommentItem as CommentType } from '../types/api'
const CommentWrap = () => {
  const params = useParams()
  const { data } = useQuery<CommentType[]>({
    queryFn: getComments,
    queryKey: ['post', 'comment', params.post],
  })
  return (
    <div className='comment_sec'>
      <h5>
        댓글 <strong>{data?.length}</strong>
      </h5>
      <ul className='commentWrap'>
        {data && data.map((comment) => <CommentItem item={comment} />)}
      </ul>

      <CommentInput />
    </div>
  )
}

export default CommentWrap
