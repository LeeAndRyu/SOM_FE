import { axiosInstance } from '../axios'
type Props = { pageParam?: number; queryKey: any }
export function getSearchList({ pageParam, queryKey }: Props) {
  const [_1, type, q] = queryKey
  const res = axiosInstance
    .get(`/search?p=${pageParam}&type=${type}&q=${q}`)
    .then((res) => res.data)
  return res
}
