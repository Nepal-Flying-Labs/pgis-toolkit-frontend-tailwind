import VerifyUser from '@Components/Authentication/VerifyUser';
import ResetPassword from '@Components/Authentication/ResetPassword';
import Authentication from '../views/Authentication';
import Home from '../views/Home';
import Organizations from '../views/Organizations';
import OrganizationDashboard from '../views/OrganizationDashboard';
import ProjectDashboard from '../views/ProjectDashboard';

const indexRoutes = [
  {
    path: '/organizations/:organizationId/projects/:projectId/:tabname',
    name: 'Project Dashboard',
    component: ProjectDashboard,
    authenticated: true,
  },
  {
    path: '/organizations/:organizationId/:tabname/:projectId',
    name: 'Organization Dashboard',
    component: OrganizationDashboard,
    authenticated: true,
    exact: true,
  },

  {
    path: '/organizations/:organizationId/:tabname',
    name: 'Organization Dashboard',
    component: OrganizationDashboard,
    authenticated: true,
  },
  {
    path: '/organizations/:organizationId/:tabname/:projectId',
    name: 'Organization Dashboard',
    component: OrganizationDashboard,
    authenticated: true,
    exact: true,
  },
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
