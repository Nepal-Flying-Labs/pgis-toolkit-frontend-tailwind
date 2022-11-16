import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizations';

const initialState = {
  organizationData: {},
};

const getOrganizationsSuccess = (state, action) => {
  return {
    ...state,
    organizationData: action.payload,
  };
};

const organizationsReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
});

export default organizationsReducer;
