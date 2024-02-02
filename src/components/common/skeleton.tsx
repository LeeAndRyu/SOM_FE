
interface Prop {
  width?: string | number
  height?: string | number
}
const Skeleton = ({ width, height }: Prop) => {
  return <li className='skeleton bg-base-200' style={{ width, height }}></li>
}

export default Skeleton
