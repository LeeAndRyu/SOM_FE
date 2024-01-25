import { useParams } from 'react-router-dom'

const Post = () => {
  const params = useParams()
  return (
    <div>
      {params.id}
      <div>{params.post}</div>
    </div>
  )
}

export default Post
