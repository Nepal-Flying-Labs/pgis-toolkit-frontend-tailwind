import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: {},
  showModal: false,
  createOrganizationDetail: null,
};

const toggleModal = (state, action) => {
  return {
    ...state,
    showModal: !!action.payload,
  };
};

const getOrganizationsSuccess = (state, action) => {
  return {
    ...state,
    organizationData: action.payload,
  };
};

const createOrganizationSuccess = (state, action) => {
  return {
    ...state,
    createOrganizationDetail: action.payload,
  };
};

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
});

export default organizationsReducer;
