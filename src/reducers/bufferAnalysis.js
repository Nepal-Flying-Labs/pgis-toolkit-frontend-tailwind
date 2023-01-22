/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/bufferAnalysis';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
};

const setBufferAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const bufferAnalysisReducer = createReducer(initialState, {
  [Types.SET_BUFFER_ANALYSIS_STATE]: setBufferAnalysisState,
});

export default bufferAnalysisReducer;
