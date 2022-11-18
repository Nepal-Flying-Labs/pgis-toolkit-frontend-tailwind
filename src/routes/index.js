import Authentication from '../views/Authentication';
import Home from '../views/Home';
import Organizations from '../views/Organizations';
import VerifyUser from '@Components/Authentication/VerifyUser';

const indexRoutes = [
  { path: '/organizations', name: 'Organizations', component: Organizations },
  { path: '/sign-up', name: 'SignUp', component: Authentication },
  { path: '/login', name: 'Login', component: Authentication },
  { path: '/verify-user', name: 'VerifyUser', component: VerifyUser },
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
