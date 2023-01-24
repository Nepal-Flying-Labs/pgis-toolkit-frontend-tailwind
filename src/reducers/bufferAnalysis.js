/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
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
    // console.log(action.payload, 'action');
  });

const bufferAnalysisReducer = createReducer(initialState, {
  [Types.SET_BUFFER_ANALYSIS_STATE]: setBufferAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.RESET_BUFFER_ANALYSIS_STATE]: resetBufferAnalysisState,
  [Types.APPLY_BUFFER_ANALYSIS_SUCCESS]: applyBufferAnalysisSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
});

export default bufferAnalysisReducer;
