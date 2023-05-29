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
import users from './users';
import dataCleaning from './dataCleaning';
import analysis from './analysis';
import routeAnalysis from './routeAnalysis';
import bufferAnalysis from './bufferAnalysis';
import proximityAnalysis from './proximityAnalysis';

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
  users,
  dataCleaning,
  analysis,
  routeAnalysis,
  bufferAnalysis,
  proximityAnalysis,
});
