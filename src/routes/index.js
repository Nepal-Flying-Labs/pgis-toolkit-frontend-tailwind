import VerifyUser from '@Components/Authentication/VerifyUser';
import ResetPassword from '@Components/Authentication/ResetPassword';
import Users from '../views/Users';
import Authentication from '../views/Authentication';
import Home from '../views/Home';
import Organizations from '../views/Organizations';
import OrganizationDashboard from '../views/OrganizationDashboard';
import ProjectDashboard from '../views/ProjectDashboard';
import UseCases from '../views/UseCases';

const indexRoutes = [
  {
    path: '/users',
    name: 'Users',
    component: Users,
    authenticated: true,
  },
  {
    path: '/organizations/:organizationId/projects/:projectId/:tabname/:analysisType/:analysisId',
    name: 'Project Dashboard',
    component: ProjectDashboard,
    authenticated: true,
  },
  {
    path: '/organizations/:organizationId/projects/:projectId/:tabname/:analysisType',
    name: 'Project Dashboard',
    component: ProjectDashboard,
    authenticated: true,
    // exact: true,
  },
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
    path: '/landing',
    name: 'Home',
    component: Home,
    authenticated: true,
  },
  {
    path: '/use-cases/:id',
    name: 'Use Cases',
    component: UseCases,
  },
];

export default indexRoutes;
