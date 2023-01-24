/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import {
  bufferPolygonStyles,
  bufferPointStyles,
} from '@src/constants/analysis';
import * as chroma from 'chroma-js';
import { Types } from '@Actions/bufferAnalysis';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    originPointType: 'map', // 'search', 'map', 'layer'
    drawPoint: false,
    originGeojson: null,
    bufferRadius: 1,
    dissolveOutput: false,
    outputName: '',
  },
  results: {
    analysisResults: [],
    zoomToRouteId: null,
  },
  analysisTaskId: null,
  poiLayers: [],
};

const setBufferAnalysisState = (state, action) => ({
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

const setResultsState = (state, action) => ({
  ...state,
  results: {
    ...state.results,
    ...action.payload,
  },
});

const resetBufferAnalysisState = () => ({ ...initialState });

const applyBufferAnalysisSuccess = (state, action) =>
  produce(state, draft => {
    draft.analysisTaskId = action.payload.task_id;
  });

const handleCheckbox = (state, action) =>
  produce(state, draft => {
    const { stateName, id, checked } = action.payload;
    const selectedData = draft[stateName].find(item => item.id === +id);
    selectedData.checked = checked;
  });

const checkProcessingStatusSuccess = (state, action) =>
  produce(state, draft => {
    const data = action.payload;
    const analysisResult = {
      ...data,
      checked: true,
      style:
        draft.results.length > 2
          ? { ...bufferPolygonStyles, fillColor: chroma.random().hex() }
          : draft.results.length === 1
          ? { ...bufferPolygonStyles }
          : { ...bufferPolygonStyles, fillColor: 'DFF2F1', fillOpacity: '50' },
      buffer_areas: data.buffer_areas.map((areas, index) => ({
        ...areas,
        name: `Result Area ${index + 1}`,
        checked: true,
        style: { ...bufferPolygonStyles },
        originStyle: { ...bufferPointStyles, fillColor: chroma.random().hex() },
      })),
    };

    draft.dataInput = initialState.dataInput;
    draft.results.analysisResults = [
      ...draft.results.analysisResults,
      analysisResult,
    ];
    draft.activeTab = 'results';
  });

const handleRouteCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, areaId, checked, name } = action.payload;
    const result = draft.results.analysisResults.find(
      item => item.id === resultId,
    );
    if (name === 'result') {
      result.checked = checked;
      result.buffer_areas.forEach(area => {
        area.checked = checked;
      });
      if (!checked) {
        draft.analysisId = null;
        draft.selectedRouteId = null;
      }
      return;
    }
    const area = result.buffer_areas.find(item => item.id === areaId);

    if (name === 'area') {
      area.checked = checked;
    }
  });

const bufferAnalysisReducer = createReducer(initialState, {
  [Types.SET_BUFFER_ANALYSIS_STATE]: setBufferAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.RESET_BUFFER_ANALYSIS_STATE]: resetBufferAnalysisState,
  [Types.APPLY_BUFFER_ANALYSIS_SUCCESS]: applyBufferAnalysisSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
});

export default bufferAnalysisReducer;
