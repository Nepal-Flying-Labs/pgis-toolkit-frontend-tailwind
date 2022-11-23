import VerifyUser from '@Components/Authentication/VerifyUser';
import ResetPassword from '@Components/Authentication/ResetPassword';
import Authentication from '../views/Authentication';
import Home from '../views/Home';
import Organizations from '../views/Organizations';

const indexRoutes = [
  {
    path: '/organizations',
    name: 'Organizations',
    component: Organizations,
    authenticated: true,
  },
  { path: '/sign-up', name: 'SignUp', component: Authentication },
  { path: '/login', name: 'Login', component: Authentication },
  { path: '/verify-user', name: 'VerifyUser', component: VerifyUser },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: Authentication,
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    authenticated: false,
  },
];

export default indexRoutes;
