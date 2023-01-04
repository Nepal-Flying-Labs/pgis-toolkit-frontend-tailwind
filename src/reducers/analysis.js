import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';

const initialState = {
  stepIndex: 1,
  optimalRoute: {
    selectedRoadLayer: null,
    selectedObstacleLayers: [], // []
  },
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setOptimalRouteState = (state, action) => ({
  ...state,
  optimalRoute: {
    ...state.optimalRoute,
    ...action.payload,
  },
});

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
  [Types.SET_OPTIMAL_ROUTE_STATE]: setOptimalRouteState,
});

export default analysisReducer;
