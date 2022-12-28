import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/users';

const initialState = {
  userData: {},
  organizationData: [],
  //   createOrganizationDetail: null,
  searchText: '',
  //   ordering: 'name',
  pagination: {
    page: 1,
    rowSelect: 10,
    count: null,
    next: null,
    previous: null,
  },
};

const getUsersSuccess = (state, action) => {
  const { counts, next, previous } = action.payload;
  return {
    ...state,
    userData: action.payload,
    pagination: {
      ...state.pagination,
      count: counts,
      next,
      previous,
    },
  };
};

const getOrganizationSuccess = (state, action) => ({
  ...state,
  organizationData: action.payload?.map(d => ({
    ...d,
    accordion: false,
    children: [],
  })),
});

// const createOrganizationSuccess = (state, action) => ({
//   ...state,
//   createOrganizationDetail: action.payload,
// });

// const setSearchText = (state, action) => ({
//   ...state,
//   searchText: action.payload,
// });

// // handle pagination in transaction page
// const handleNextClick = state => {
//   if (state.pagination.next !== null) {
//     return {
//       ...state,
//       pagination: {
//         ...state.pagination,
//         page: state.pagination.page + 1,
//       },
//     };
//   }
//   return {
//     ...state,
//   };
// };
// const handlePreviousClick = state => {
//   if (state.pagination.previous !== null) {
//     return {
//       ...state,
//       pagination: {
//         ...state.pagination,
//         page: state.pagination.page - 1,
//       },
//     };
//   }
//   return { ...state };
// };

// const handleJumpsTo = (state, action) =>
//   // if (action.payload !== '')
//   ({
//     ...state,
//     pagination: {
//       ...state.pagination,
//       page: parseInt(action.payload, 10),
//     },
//   });

// const handleRowSelect = (state, action) => ({
//   ...state,
//   pagination: { ...state.pagination, page: 1, rowSelect: action.payload },
// });

// const handleOrdering = (state, action) => ({
//   ...state,
//   ordering: action.payload,
// });

const usersReducer = createReducer(initialState, {
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_ORGANIZATION_SUCCESS]: getOrganizationSuccess,

  //   [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  //   [Types.SET_SEARCH_TEXT]: setSearchText,
  //   [Types.HANDLE_NEXT_CLICK]: handleNextClick,
  //   [Types.HANDLE_PREVIOUS_CLICK]: handlePreviousClick,
  //   [Types.HANDLE_JUMPS_TO]: handleJumpsTo,
  //   [Types.HANDLE_ROW_SELECT]: handleRowSelect,
  //   [Types.HANDLE_ORDERING]: handleOrdering,
});

export default usersReducer;
