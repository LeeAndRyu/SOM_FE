import { useLayoutEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/protected_route'
import Layout from './components/layout'
import LoadingScreen from './components/loading'
import Home from './routes/home'
import Login from './routes/login'
import Write from './routes/write'
import Search from './routes/search'
import Auth from './routes/auth'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useLayoutEffect(() => {
    setIsLoading(false)
  }, [])
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
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
    /* 
    {
      path: '/create-acount',
      element: <CreateAcount />,
    }, */
  ])
  return (
    <>{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}</>
  )
}

export default App
