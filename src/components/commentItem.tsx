import Avatar from './common/avatar'

export const CommentItem = () => {
  return (
    <li>
      <Avatar size={40} />
    </li>
  )
}

export const CommentInput = () => {
  return (
    <form action=''>
      <textarea
        placeholder='댓글을 입력해주세요!'
        className='textarea textarea-bordered textarea-lg w-full'
      ></textarea>
    </form>
  )
}
