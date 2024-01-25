import { useLayoutEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoadingScreen from './components/loading'
import Home from './routes/home'
import Login from './routes/login'
import Write from './routes/write'
import Search from './routes/search'
import Auth from './routes/auth'
import BasicLayout from './components/basicLayout'
import BasicRoute from './components/basicRoute'
import BlogRoute from './components/blogRoute'
import BlogLayout from './components/blogLayout'
import Post from './routes/post'
import Blog from './routes/blog'
import { ToastContainer } from 'react-toastify'
import RecoilRootWrapper from './components/recoilRootWrapper'

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
          <BasicLayout />
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
    {
      path: 'blog',
      element: (
        <BlogRoute>
          <BlogLayout />
        </BlogRoute>
      ),
      children: [
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
