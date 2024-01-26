import Article from '../assets/background.png'
import Avatar from './common/avatar'
// import { FaCommentDots } from 'react-icons/fa6'
import { FaRegHeart } from 'react-icons/fa'
import { IoBarChart } from 'react-icons/io5'
const ArticleItem = () => {
  return (
    <li className='articleItem'>
      <div className='top_section'>
        <div>
          <img src={Article} />
        </div>
      </div>
      <div className='middle_section'>
        <p className='title'>타이틀 영역입니다</p>
        <p className='content'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ut
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ut
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ut
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ut
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ut
          ipsum neque praesentium ipsam{' '}
        </p>
        <p className='tags'>
          <span>개발</span>
          <span>React</span>
          <span>트러블슈팅</span>
          <span>일기</span>

          <span className='moreTags'>+9개</span>
        </p>
        <p className='info'>
          <span className='infoUser'>
            by <strong>nara</strong>{' '}
          </span>
          <span>
            <strong>0</strong>개의 댓글
          </span>
          <span>2024.01.14</span>
        </p>
      </div>
      <div className='icon_section'>
        <Avatar size={40} />
        <p>
          <span>13</span>
          <IoBarChart />
        </p>
        <p>
          <FaRegHeart />
        </p>
      </div>
    </li>
  )
}

export default ArticleItem
