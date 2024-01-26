export interface UserResponse {
  member: UserDetail
  tokenResponse: UserToken
}
export interface UserDetail {
  accountName: string
  blogName: string
  email: string
  introduction: string
  memberId: number
  nickname: string
  profileImage: string
  registeredAt: Date
  role: string
}
export interface UserToken {
  accessToken: string
  refreshToken: string
  tokenType: string
}
