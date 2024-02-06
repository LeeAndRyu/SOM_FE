import { useParams } from 'react-router-dom'
import { CommentInput, CommentItem } from './commentItem'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '../lib/useQuery/getPost'
import { CommentItem as CommentType } from '../types/api'
import { FollowStatus } from '../types/app'
interface Prop {
  loggedState: FollowStatus
}
const CommentWrap = ({ loggedState }: Prop) => {
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
        {data &&
          data.map((comment) => (
            <CommentItem item={comment} key={comment.commentId} />
          ))}
      </ul>

      <CommentInput loggedState={loggedState} />
    </div>
  )
}

export default CommentWrap
