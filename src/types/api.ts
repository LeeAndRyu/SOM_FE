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

export interface BlogMember {
  blogName: string
  followerCount: number
  followingCount: number
  introduction: string
  loginMemberFollowStatus: string
  nickname: string
  profileImage: string
}

export interface BlogTags {
  tagList: TagItem[]
  totalPostCount: number
}

export interface TagItem {
  tagCount: number
  tagId: number
  tagName: string
}

export interface PostRes {
  pageDto: {
    currentElements: number
    currentPage: number
    pageSize: number
    totalElement: number
    totalPages: number
  }
  postList: PostItem[]
}
export interface PostItem {
  accountName: string
  introduction: string
  likes: number
  memberId: number
  postId: number
  profileImage: string
  registeredAt: Date
  tags: string[]
  thumbnail: string
  title: string
  views: number
}

export interface PostDetail {
  accountName: string
  content: string
  introduction: string
  lastModifiedAt: Date
  likes: number
  memberId: number
  postId: number
  registeredAt: Date
  tags: string[]
  thumbnail: string
  title: string
  views: number
}
