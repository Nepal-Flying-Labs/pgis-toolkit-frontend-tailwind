import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';
import authentication from './authentication';
import loader from './loader';
import toast from './toast';
import organizations from './organizations';
import organizationDashboard from './organizationDashboard';

export default combineReducers({
  router: connectRouter(history),
  authentication,
  loader,
  toast,
  organizations,
  organizationDashboard,
});
