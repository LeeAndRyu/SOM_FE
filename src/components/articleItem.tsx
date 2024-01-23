import React from 'react'
import Article from '../assets/background.png'
import Avatar from './common/avatar'
import { FaCommentDots } from 'react-icons/fa6'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
const ArticleItem = () => {
  return (
    <li>
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
        <p className='info'>
          <span>
            by <strong>nara</strong>{' '}
          </span>
          <span>2024.01.14</span>
        </p>
      </div>
      <div className='icon_section'>
        <Avatar size={40} />
        <p>
          <span>10</span>
          <FaCommentDots />
        </p>
        <p>
          <FaRegHeart />
        </p>
      </div>
    </li>
  )
}

export default ArticleItem
