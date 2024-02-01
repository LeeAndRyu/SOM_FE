import { FaRegHeart, FaShareAlt } from 'react-icons/fa'
const LikeAndShare = () => {
  return (
    <ul className='likeAndShare'>
      <li>
        <FaRegHeart />
        <span>3</span>
      </li>
      <li>
        <FaShareAlt />
      </li>
    </ul>
  )
}

export default LikeAndShare
