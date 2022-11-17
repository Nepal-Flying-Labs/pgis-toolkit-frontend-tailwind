import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['payload'],
  loginFailure: ['payload'],

  verifyUserRequest: ['params'],
  verifyUserSuccess: ['payload'],
  verifyUserFailure: null,

  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,
});

export default Creators;
