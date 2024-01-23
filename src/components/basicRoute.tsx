import React from 'react'
import RecoilRootWrapper from './recoilRootWrapper'

const BasicRoute = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRootWrapper>{children}</RecoilRootWrapper>
}

export default BasicRoute
