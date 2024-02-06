import { axiosInstance } from '../axios'

export function getNotifications() {
  const res = axiosInstance.get(`/notifications`).then((res) => res.data)
  return res
}
