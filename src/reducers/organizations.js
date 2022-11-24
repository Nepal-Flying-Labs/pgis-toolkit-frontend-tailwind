import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: {},
  modalContent: '',
  createOrganizationDetail: null,
  searchText: '',
};

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const getOrganizationsSuccess = (state, action) => ({
  ...state,
  organizationData: action.payload,
});

const createOrganizationSuccess = (state, action) => ({
  ...state,
  createOrganizationDetail: action.payload,
  modalContent: 'create-organization-success',
});

const setSearchText = (state, action) => ({
  ...state,
  searchText: action.payload,
});

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.SET_SEARCH_TEXT]: setSearchText,
});

export default organizationsReducer;
