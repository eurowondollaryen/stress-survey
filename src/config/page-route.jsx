import React from 'react';
import { Redirect } from 'react-router';

import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';

const routes = [
  {
    pathId: 'root',
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  {
    pathId: 'home',
    path: '/home',
    component: () => <Home />,
  },
  {
    pathId: 'about',
    path: '/about',
    component: () => <About />,
  },
  {
    pathId: 'contact',
    path: '/contact',
    component: () => <Contact />,
  },
];

export default routes;
