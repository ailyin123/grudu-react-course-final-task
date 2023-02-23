import {
  createBrowserRouter,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Tweets from './pages/tweets/Tweets';
import Logout from './pages/logout/Logout';

export default createBrowserRouter([
  {
    path: '/',
    element: <Tweets />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  }
]);
