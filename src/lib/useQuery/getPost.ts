import { axiosInstance } from '../axios'

export function getPost({ queryKey }: any) {
  const [_1, _accountName, postId] = queryKey
  const res = axiosInstance.get(`/post/${postId}`).then((res) => res.data)
  return res
}
export function getPostImageList({ queryKey }: any) {
  const [_1, _accountName, postId] = queryKey
  const res = axiosInstance.get(`/post/${postId}/images`).then((res) => res.data)
  return res
}
