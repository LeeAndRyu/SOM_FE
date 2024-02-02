import { axiosInstance } from '../axios'

export function getPost({ queryKey }: any) {
  const [_1, _accountName, postId] = queryKey
  const res = axiosInstance.get(`/post/${postId}`).then((res) => res.data)
  return res
}
export function getPostImageList({ queryKey }: any) {
  const [_1, _accountName, postId] = queryKey
  const res = axiosInstance
    .get(`/post/${postId}/images`)
    .then((res) => res.data)
  return res
}
export function getLikeStatus({ queryKey }: any) {
  const [_1, _2, postId] = queryKey
  const res = axiosInstance.get(`/post/${postId}/likes`).then((res) => res.data)
  return res
}
export function changeLikeStatus({ queryKey }: any) {
  const [_1, _2, postId] = queryKey
  const res = axiosInstance.post(`/post/${postId}/likes`).then((res) => res.data)
  return res
}
