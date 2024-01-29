import { axiosInstance } from '../axios'
export function getBlogMember({ queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = axiosInstance
    .get(`/blog/${accountName}/member`)
    .then((res) => res.data)
  return res
}

export function getBlogList({ queryKey }: any) {
  const [_1, accountName, _3] = queryKey
  const res = axiosInstance
    .get(`/blog/${accountName}/posts`)
    .then((res) => res.data)
  return res
}
