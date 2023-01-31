import React from 'react';
import {
  createBrowserRouter,
  Link,
} from 'react-router-dom';
import Tweets from './pages/tweets/Tweets';

export default createBrowserRouter([
  {
    path: '/',
    element: <Tweets />
  }
]);
