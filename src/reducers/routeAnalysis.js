/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/routeAnalysis';
import produce from 'immer';

const initialState = {
  dataInput: {
    selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
    originPointType: 'search', // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startCoordinates: null,
    destinationCoordinates: null,
  },
  results: {},
  layers: {},
};

// const setDataInputState = (state, action) =>
//   produce(state, draft => {
//     draft.dataInput = action.payload;
//   });

const setDataInputState = (state, action) => ({
  ...state,
  dataInput: {
    ...state.dataInput,
    ...action.payload,
  },
});

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
});

export default routeAnalysisReducer;
