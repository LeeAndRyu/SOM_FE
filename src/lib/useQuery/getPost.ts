import { axiosInstance } from '../axios'

export function getPost({ queryKey }: any) {
  const [_1, accountName, postId] = queryKey
  const res = axiosInstance.get(`/post/${postId}`).then((res) => res.data)
  return res
}
