import { useNavigate } from 'react-router-dom'
import Article from '../assets/background.png'
import { PostItem } from '../types/api'
import ErrorImage from '../assets/addImg.jpg'
import Avatar from './common/avatar'
import { FaCommentDots } from 'react-icons/fa6'
import { FaRegHeart, FaComment, FaHeart } from 'react-icons/fa'
// import { IoBarChart } from 'react-icons/io5'

const ArticleItem = ({ item }: { item: PostItem }) => {
  const navigate = useNavigate()
  return (
    <>
      <li
        className='articleItem'
        onClick={() => navigate(`/blog/${item?.accountName}/${item?.postId}`)}
      >
        <div className='top_section'>
          <div>
            {item?.thumbnail && (
              <img
                onError={(e) => (e.currentTarget.src = ErrorImage)}
                src={item?.thumbnail || Article}
              />
            )}
          </div>
        </div>
        <div className='middle_section'>
          <p className='title'>{item?.title}</p>
          <p className='content'>{item?.introduction}</p>
          <p className='tags'>
            {item?.tags.map((tag, idx) => {
              if (idx > 3) return <></>
              return <span key={idx}>{tag}</span>
            })}
            {item.tags.length > 4 && (
              <span className='moreTags'>+{item.tags.length - 4}개</span>
            )}
          </p>
          <div className='info'>
            <span className='infoUser'>
              by <strong>{item?.accountName}</strong>{' '}
            </span>
            <p>
              <span>
                <FaComment />
                &nbsp;
                <strong>{item.comments}</strong>개의 댓글
              </span>
              <span>
                <FaHeart />
                &nbsp;<strong>{item.likes}</strong>개의 좋아요
              </span>
            </p>
            <span>{new Date(item?.registeredAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className='icon_section'>
          <Avatar
            size={40}
            accountName={item.accountName}
            src={item.profileImage}
          />
          <p>
            <span>{item?.comments}</span>
            <FaCommentDots />
          </p>
          <p>
            <span>{item?.likes}</span>
            <FaRegHeart />
          </p>
        </div>
      </li>
    </>
  )
}

export default ArticleItem
