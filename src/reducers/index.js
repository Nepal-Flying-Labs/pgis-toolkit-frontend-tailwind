import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';
import authentication from './authentication';
import loader from './loader';
import toast from './toast';
import common from './common';
import organizations from './organizations';
import organizationDashboard from './organizationDashboard';
import projectDashboard from './projectDashboard';
import projectMap from './projectMap';

export default combineReducers({
  router: connectRouter(history),
  authentication,
  loader,
  toast,
  common,
  organizations,
  organizationDashboard,
  projectDashboard,
  projectMap,
});
