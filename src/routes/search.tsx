// import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import ArticleWrap from '../components/articleWrap'
const Search = () => {
  // const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <form>
        <span>
          <IoMdSearch />
        </span>
        <input
          type='text'
          placeholder='Search'
          className=' bg-base-200 border-none outline-neutral text-neutral searchInput input input-bordered input-lg w-full'
        />
      </form>
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
