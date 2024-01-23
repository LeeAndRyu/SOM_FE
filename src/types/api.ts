export interface UserDetail {
  member: {
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
  tokenResponse: {
    accessToken: string
    refreshToken: string
    tokenType: string
  }
}
