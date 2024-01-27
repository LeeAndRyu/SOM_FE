import { axiosInstance } from '../axios'
export function getBlog({ queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = axiosInstance
    .get(`/blog/${accountName}/member`)
    .then((res) => res.data)
  return res
}
