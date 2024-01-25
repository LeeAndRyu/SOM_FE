// import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
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
    </>
  )
}

export default Search
