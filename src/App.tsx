import { useLayoutEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoadingScreen from './components/loading'
import Home from './routes/home'
import Login from './routes/login'
import Write from './routes/write'
import Search from './routes/search'
import Auth from './routes/auth'
import Layout from './components/layout'
import BasicRoute from './components/basicRoute'
import Post from './routes/post'
import Blog from './routes/blog'
import { ToastContainer } from 'react-toastify'
import RecoilRootWrapper from './components/recoilRootWrapper'
import Mypage from './routes/mypage'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useLayoutEffect(() => {
    setIsLoading(false)
  }, [])
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <BasicRoute>
          <Layout />
        </BasicRoute>
      ),
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'write',
          element: <Write />,
        },
        {
          path: 'search',
          element: <Search />,
        },
        {
          path: 'mypage',
          element: <Mypage />,
        },
        {
          path: '/blog/:id',
          element: <Blog />,
        },
        {
          path: '/blog/:id/:post',
          element: <Post />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/auth',
      element: <Auth />,
    },

    /* 
    {
      path: '/create-acount',
      element: <CreateAcount />,
    }, */
  ])
  return (
    <>
      {' '}
      <RecoilRootWrapper>
        <ToastContainer
          style={{ zIndex: 200 }}
          hideProgressBar={false}
          position='top-center'
          // theme='dark'
        />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </RecoilRootWrapper>
    </>
  )
}

export default App
