import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/users';

const initialState = {
  userData: [],
  //   createOrganizationDetail: null,
  searchText: '',
  pageTab: 'users',
  item: {},
  //   ordering: 'name',
  pagination: {
    page: 1,
    rowSelect: 10,
    count: null,
    next: null,
    previous: null,
  },
};

const getUsersSuccess = (state, action) =>
  // const { counts, next, previous } = action.payload;
  ({
    ...state,
    userData: action.payload,
  });
// const getOrganizationSuccess = (state, action) => ({
//   ...state,
//   organizationData: action.payload?.map(d => ({
//     ...d,
//     children: [],
//   })),
// });

const setUserState = (state, action) => ({
  ...state,
  ...action.payload,
});

const updateUserStatusSuccess = (state, action) => {
  const users = action.payload;
  const newData = state.userData.map(user => {
    const { active } = user;
    return user.id === users.id ? { ...user, active: !active } : { ...user };
  });
  return {
    ...state,
    userData: newData,
  };
};

const deleteUserSuccess = (state, action) => {
  const users = action.payload;
  const newData = state.userData.map(user =>
    user.id === users.id ? null : { ...user },
  );
  return {
    ...state,
    userData: newData,
  };
};

const updateInvitedUserStatusSuccess = (state, action) => {
  const users = action.payload;
  const newData = state.userData.map(user =>
    user.id === users.id ? { ...user, status: 'Expired' } : { ...user },
  );
  return {
    ...state,
    userData: newData,
  };
};

const resendInvitationSuccess = (state, action) => {
  const users = action.payload;
  const newData = state.userData.map(user =>
    user.id === users.id ? { ...user, status: 'Pending' } : { ...user },
  );
  return {
    ...state,
    userData: newData,
  };
};

const deleteInvitedUserSuccess = (state, action) => {
  const users = action.payload;
  const newData = state.userData.map(user =>
    user.id === users.id ? null : { ...user },
  );
  return {
    ...state,
    userData: newData,
  };
};

const usersReducer = createReducer(initialState, {
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  // [Types.GET_ORGANIZATION_SUCCESS]: getOrganizationSuccess,
  [Types.SET_USER_STATE]: setUserState,
  [Types.UPDATE_USER_STATUS_SUCCESS]: updateUserStatusSuccess,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.UPDATE_INVITED_USER_STATUS_SUCCESS]: updateInvitedUserStatusSuccess,
  [Types.RESEND_INVITATION_SUCCESS]: resendInvitationSuccess,
  [Types.DELETE_INVITED_USER_SUCCESS]: deleteInvitedUserSuccess,

  //   [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  //   [Types.SET_SEARCH_TEXT]: setSearchText,
  //   [Types.HANDLE_NEXT_CLICK]: handleNextClick,
  //   [Types.HANDLE_PREVIOUS_CLICK]: handlePreviousClick,
  //   [Types.HANDLE_JUMPS_TO]: handleJumpsTo,
  //   [Types.HANDLE_ROW_SELECT]: handleRowSelect,
  //   [Types.HANDLE_ORDERING]: handleOrdering,
});

export default usersReducer;
