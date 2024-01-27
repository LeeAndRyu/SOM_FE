import { useEffect } from 'react'
import { useParams } from 'react-router-dom'



const Post = () => {
  const params = useParams()
  useEffect(() => {}, [])
  return (
    <div>
      
      {params.id}
      <div>{params.post}</div>
    </div>
  )
}

export default Post
