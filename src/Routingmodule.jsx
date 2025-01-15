import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UserTable from './Components/UserTable/UserTable';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CreateUser from './Components/CreateUser/CreateUser';
import EditUser from './Components/UserTable/EditUser';
import Welcome from './Components/Home/Welcome';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const RoutingModule = () => {
  const AppRoute = createBrowserRouter([
    {
      path: '/',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/forgetpwd',
      element: <ForgetPassword />
    },
    {
      path: '/resetpwd',
      element: <ResetPassword />
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'welcome',
          element: <Welcome />
        },
        {
          path: 'table',
          element: <UserTable />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'create',
          element: <CreateUser />
        },
        {
          path: 'edit',
          element: <EditUser />
        }
      ]
    }
  ]);
  return <RouterProvider router={AppRoute}></RouterProvider>;
};

export default RoutingModule;
