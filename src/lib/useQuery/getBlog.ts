import { axiosInstance } from '../axios'
export function getBlogMember({ queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = axiosInstance
    .get(`/blog/${accountName}/member`)
    .then((res) => res.data)
  return res
}

export function getBlogList({ queryKey, pageParam }: any) {
  const [_1, accountName, _3, searchParams] = queryKey
  const urlSearchParams = new URLSearchParams(searchParams)
  const res = axiosInstance
    .get(
      `/blog/${accountName}/posts?p=${pageParam}&${urlSearchParams.toString()}`
    )
    .then((res) => res.data)
  return res
}

export function getBlogTags({ queryKey }: any) {
  const [_1, accountName, _3] = queryKey

  const res = axiosInstance
    .get(`/blog/${accountName}/tags`)
    .then((res) => res.data)
  return res
}
