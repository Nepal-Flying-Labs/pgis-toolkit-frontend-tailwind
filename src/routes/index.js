import Authentication from '../views/Authentication';
import Home from '../views/Home';
import Organizations from '../views/Organizations';

const indexRoutes = [
  { path: '/organizations', name: 'Organizations', component: Organizations },
  { path: '/login', name: 'Authentication', component: Authentication },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: Authentication,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    authenticated: false,
  },
];

export default indexRoutes;
