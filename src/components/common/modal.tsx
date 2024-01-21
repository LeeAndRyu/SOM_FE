import { useRef } from 'react'

const Modal = ({
  children,
  btnMessage,
  arrow,
}: {
  children: React.ReactNode
  btnMessage: string
  arrow?: React.ReactNode
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null)
  return (
    <>
      <button
        className='btn loginBtn'
        onClick={() => modalRef.current && modalRef.current.showModal()}
      >
        {btnMessage}
        {arrow}
      </button>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm nofocus btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  )
}

export default Modal
