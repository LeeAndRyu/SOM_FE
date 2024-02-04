import React from 'react'
import { useNavigate } from 'react-router-dom'
interface Prop {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const NotLoggedModal = ({ setModal }: Prop) => {
  const navigate = useNavigate()
  return (
    <div className='fixModal'>
      <div className='card w-96 bg-neutral text-neutral-content'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title mb-2'>로그인이 필요한 기능입니다</h2>
          <p className='mb-5'>해당 페이지로 이동하시겠습니까?</p>
          <div className='card-actions justify-end '>
            <button
              className='btn btn-primary'
              onClick={() => navigate('/login')}
            >
              이동
            </button>
            <button
              className='btn btn-ghost'
              onClick={() => setModal((prev) => !prev)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotLoggedModal
