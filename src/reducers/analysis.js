import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';

const initialState = {
  stepIndex: 1,
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
});

export default analysisReducer;
