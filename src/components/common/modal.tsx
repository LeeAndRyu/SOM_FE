import { useRef } from 'react';

const Modal = ({
  children,
  btnMessage,
}: {
  children: React.ReactNode;
  btnMessage: string;
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <button
        className='btn'
        onClick={() => modalRef.current && modalRef.current.showModal()}
      >
        {btnMessage}
      </button>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
