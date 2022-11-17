import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: {},
  showModal: false,
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

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
});

export default organizationsReducer;
