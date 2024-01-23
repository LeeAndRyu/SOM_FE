import React from 'react'
import RecoilRootWrapper from './recoilRootWrapper'

const BlogRoute = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRootWrapper>{children}</RecoilRootWrapper>
}

export default BlogRoute
