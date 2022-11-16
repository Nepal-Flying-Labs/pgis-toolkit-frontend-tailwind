import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';
import login from './login';
import authentication from './authentication';
import loader from './loader';
import toast from './toast';

export default combineReducers({
  router: connectRouter(history),
  login,
  authentication,
  loader,
  toast,
});
