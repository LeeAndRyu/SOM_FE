import { useNavigate } from 'react-router-dom'
import Article from '../assets/background.png'
import { PostItem } from '../types/api'
import ErrorImage from '../assets/addImg.jpg'
import Avatar from './common/avatar'
import { FaCommentDots } from 'react-icons/fa6'
import { FaRegHeart } from 'react-icons/fa'
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
            {item.tags.length > 3 && (
              <span className='moreTags'>+{item.tags.length - 3}개</span>
            )}
          </p>
          <p className='info'>
            <span className='infoUser'>
              by <strong>{item?.accountName}</strong>{' '}
            </span>
            <span>
              <strong>0</strong>개의 댓글
            </span>
            <span>{item?.registeredAt + ''}</span>
          </p>
        </div>
        <div className='icon_section'>
          <Avatar size={40} accountName={item.accountName} />
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
