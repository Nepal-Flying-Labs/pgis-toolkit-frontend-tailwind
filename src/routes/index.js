import Authentication from '../views/Authentication';
import Home from '../views/Home';

const indexRoutes = [
  { path: '/login', name: 'Authentication', component: Authentication },
  {
    path: '/',
    name: 'Home',
    component: Home,
    authenticated: false,
  },
];

export default indexRoutes;
