import Login from '../views/Login';
import Home from '../views/Home';

const indexRoutes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    name: 'Home',
    component: Home,
    authenticated: false,
  },
];

export default indexRoutes;
