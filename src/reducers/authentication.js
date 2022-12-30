import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
// import persist from '../utils/persist';

const initialState = {
  user: {},
  userDetail: {},
  userProfile: {},
  infoDialogContent: null,
  userPermissions: null,
  userGroup: null,
  settings: {
    profile: {},
    notification: {},
    password: {},
  },
};

const loginSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const verifyUserSuccess = (state, action) => ({
  ...state,
  userDetail: action.payload,
});

const setInfoDialogContent = (state, action) => ({
  ...state,
  infoDialogContent: action.payload,
});

const getUserPermissionsSuccess = (state, action) => ({
  ...state,
  userPermissions: action.payload.permissions,
});

const getUserGroupSuccess = (state, action) => ({
  ...state,
  userGroup: action.payload,
});

const getUserProfileSuccess = (state, action) => ({
  ...state,
  userProfile: action.payload,
  settings: {
    ...state.settings,
    profile: {
      ...action.payload,
      image: {
        image: action.payload.image ? action.payload.image : '',
        existedData: true,
      },
    },
  },
});

// const updateUserSuccess = (state, action) => ({
//   ...state,
//   userProfile: { ...state.userProfile, ...action.payload },
//   settings: {
//     ...state.settings,
//     profile: {
//       ...state.profile,
//       ...action.payload,
//       image: {
//         image: action.payload.image ? action.payload.image : '',
//         existedData: true,
//       },
//     },
//   },
// });

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
  [Types.SET_INFO_DIALOG_CONTENT]: setInfoDialogContent,
  [Types.GET_USER_PERMISSIONS_SUCCESS]: getUserPermissionsSuccess,
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,
  [Types.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,
  // [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
});

export default authenticationReducer;
