import { axiosInstance } from '../axios'
type Props = { pageParam?: number; queryKey: any }
export function getHomeList({ pageParam, queryKey }: Props) {
  const [_1, sort] = queryKey
  const res = axiosInstance
    .get(`/main?p=${pageParam}&sort=${sort === 0 ? 'hot' : 'latest'}`)
    .then((res) => res.data)
  return res
}
