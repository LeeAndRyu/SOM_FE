import { RiErrorWarningFill } from "react-icons/ri";

const WarningMsg = ({ message }: { message: string }) => {
  return (
    <p className='warnP'>
      <RiErrorWarningFill />
      <span>{message}</span>
    </p>
  )
}

export default WarningMsg
