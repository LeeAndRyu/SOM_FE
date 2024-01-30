// import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import ArticleWrap from '../components/articleWrap'
import { useState } from 'react'
type SearchType = 'title' | 'content' | 'tag'
const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchType, setType] = useState<SearchType>('title')

  return (
    <>
      <form>
        <span>
          <IoMdSearch />
        </span>
        <input
          type='text'
          // value={searchValue}
          defaultValue={searchValue}
          placeholder='Search'
          className=' bg-base-200 border-none outline-neutral text-neutral searchInput input input-bordered input-lg w-full'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        
      </form>
      <div className='typeSec'>
        <p>
          <label htmlFor='inputTitle'>제목 및 소개</label>
          <input
            type='radio'
            name='searchType'
            id='inputTitle'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('title')}
            // checked
            checked={searchType === 'title'}
          />
        </p>
        <p>
          <label htmlFor='inputContent'>내용</label>
          <input
            type='radio'
            name='searchType'
            id='inputContent'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('content')}
            checked={searchType === 'content'}
          />
        </p>
        <p>
          <label htmlFor='inputTag'>태그</label>
          <input
            type='radio'
            name='searchType'
            id='inputTag'
            className='radio radio-accent'
            onChange={(e) => e.target.checked && setType('tag')}
            checked={searchType === 'tag'}
          />
        </p>
      </div>
      <div className='search_sec'>
        <p className='resultP'>
          🔍 총 <span>98</span>건이 검색되었습니다
        </p>
        <ArticleWrap />
      </div>
    </>
  )
}

export default Search
