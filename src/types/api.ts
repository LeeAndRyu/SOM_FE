import { FollowStatus, LikeStatus } from './app'

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
  followStatus: FollowStatus
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
  comments?: number
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
export interface LikeState {
  memberId: number
  message: string
  postId: number
  likesStatus: LikeStatus
}
export interface LikeResult {
  memberId: number
  message: string
  postId: number
  result: LikeStatus
}

export interface CommentItem {
  commentId: number
  content: string
  lastModifiedAt: Date
  postId: number
  registeredAt: Date
  writerAccountName: string
  writerId: number
  writerNickname: string
  writerProfileImage: string
}

export interface NotificationItem {
  createdAt: Date
  memberId: number
  message1: string
  message2: string
  notificationId: number
  notificationSituation: string
  readAt: Date
  targetEntityId: number
  title: string
  url: string
  writerAccountName: string
  writerId: number
  writerProfileImage: string
}

