import { useLayoutEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/protected_route';
import Layout from './components/layout';
import LoadingScreen from './components/loading';
import Home from './routes/home';
import Login from './routes/login';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    setIsLoading(false);
  }, []);
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
          path: 'profile',
          // element: <Profile />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    /* 
    {
      path: '/create-acount',
      element: <CreateAcount />,
    }, */
  ]);
  return (
    <>{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}</>
  );
}

export default App;
