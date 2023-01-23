import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: [],
  selectedOrganization: null,
  createOrganizationDetail: null,
  searchText: '',
  ordering: 'name',
  pagination: {
    page: 1,
    rowSelect: 10,
    count: null,
    next: null,
    previous: null,
  },
};

const getOrganizationsSuccess = (state, action) => {
  const { counts, next, previous, results } = action.payload;
  return {
    ...state,
    organizationData: results,
    pagination: {
      ...state.pagination,
      count: counts,
      next,
      previous,
    },
  };
};

const createOrganizationSuccess = (state, action) => ({
  ...state,
  createOrganizationDetail: action.payload,
});

const setSearchText = (state, action) => ({
  ...state,
  searchText: action.payload,
});

// handle pagination in transaction page
const handleNextClick = state => {
  if (state.pagination.next !== null) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        page: state.pagination.page + 1,
      },
    };
  }
  return {
    ...state,
  };
};
const handlePreviousClick = state => {
  if (state.pagination.previous !== null) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        page: state.pagination.page - 1,
      },
    };
  }
  return { ...state };
};

const handleJumpsTo = (state, action) =>
  // if (action.payload !== '')
  ({
    ...state,
    pagination: {
      ...state.pagination,
      page: parseInt(action.payload, 10),
    },
  });

const handleRowSelect = (state, action) => ({
  ...state,
  pagination: { ...state.pagination, page: 1, rowSelect: action.payload },
});

const handleOrdering = (state, action) => ({
  ...state,
  ordering: action.payload,
});

const setSelectedOrganization = (state, action) => ({
  ...state,
  selectedOrganization: action.payload,
});

const deleteOrganizationSuccess = (state, action) => {
  const data = action.payload;
  const newData = state.organizationData.filter(
    orgData => orgData.id !== data.id,
  );
  return {
    ...state,
    organizationData: newData,
  };
};

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.HANDLE_NEXT_CLICK]: handleNextClick,
  [Types.HANDLE_PREVIOUS_CLICK]: handlePreviousClick,
  [Types.HANDLE_JUMPS_TO]: handleJumpsTo,
  [Types.HANDLE_ROW_SELECT]: handleRowSelect,
  [Types.HANDLE_ORDERING]: handleOrdering,
  [Types.SET_SELECTED_ORGANIZATION]: setSelectedOrganization,
  [Types.DELETE_ORGANIZATION_SUCCESS]: deleteOrganizationSuccess,
});

export default organizationsReducer;
