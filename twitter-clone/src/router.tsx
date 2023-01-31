import React from 'react';
import {
  createBrowserRouter,
  Link,
} from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Tweets from './pages/tweets/Tweets';

export default createBrowserRouter([
  {
    path: '/',
    element: <Tweets />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);
