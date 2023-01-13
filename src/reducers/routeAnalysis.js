/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { Types } from '@Actions/routeAnalysis';
import {
  destinationPointColor,
  startingPointColor,
} from '@src/constants/analysis';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
    originPointType: 'map', // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startGeojson: null,
    destinationGeojson: null,
    alternativePaths: null,
    outputName: '',
  },
  results: {
    analysisResults: [],
  },
  layers: {},
  // roadNetworkLayer: null,
  // obstacleLayers: null,
  obstacleLayers: [],
  analysisTaskId: null,
  analysisId: null,
};

const setRouteAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setDataInputState = (state, action) => ({
  ...state,
  dataInput: {
    ...state.dataInput,
    ...action.payload,
  },
});

const handleCheckbox = (state, action) =>
  produce(state, draft => {
    const { stateName, id, checked } = action.payload;
    const selectedData = draft[stateName].find(item => item.id === +id);
    selectedData.checked = checked;
  });

const applyRouteAnalysisSuccess = (state, action) =>
  produce(state, draft => {
    draft.analysisTaskId = action.payload.task_id;
  });

const checkProcessingStatusSuccess = (state, action) =>
  produce(state, draft => {
    const data = action.payload;
    const analysisResult = {
      ...data,
      checked: true,
      routes: [
        {
          id: 1,
          name: 'Optimal Route',
          data: data.routes
            .filter(item => item.is_optimum)
            .map(item => ({
              ...item,
              name: `Route ${item.route_no}`,
              checked: true,
              style: {
                ...draft.roadNetworkLayer.style,
                lineColor: startingPointColor,
              },
            })),
          checked: true,
        },
        {
          id: 2,
          name: 'Alternate Route',
          data: data.routes
            .filter(item => !item.is_optimum)
            .map(item => ({
              ...item,
              name: `Route ${item.route_no}`,
              checked: true,
              style: {
                ...draft.roadNetworkLayer.style,
                lineColor: destinationPointColor,
              },
            })),
          checked: true,
        },
      ],
    };
    draft.analysisTaskId = null;
    draft.dataInput = initialState.dataInput;
    draft.activeTab = 'results';
    draft.results.analysisResults.push(analysisResult);
  });

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
});

export default routeAnalysisReducer;
