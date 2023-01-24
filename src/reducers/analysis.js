/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';

const initialState = {
  analysisTaskId: null,
  analysisId: null,
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
});

export default analysisReducer;
