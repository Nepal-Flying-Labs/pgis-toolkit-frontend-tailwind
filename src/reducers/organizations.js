import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: {},
  modalContent: '',
  createOrganizationDetail: null,
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

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
});

export default organizationsReducer;
