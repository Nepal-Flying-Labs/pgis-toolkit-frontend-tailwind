/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { Types } from '@Actions/routeAnalysis';

const initialState = {
  dataInput: {
    selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
    originPointType: 'map', // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startGeojson: null,
    destinationGeojson: null,
    alternativePaths: null,
    outputName: '',
  },
  results: {},
  layers: {},
  // roadNetworkLayer: null,
  roadNetworkLayer: {
    id: 523,
    name: 'Sample Road Network',
    layer_type: 'Vector',
    upload_status: 'successful',
    is_clean: false,
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#2C675A',
      lineOpacity: 100,
      fillColor: '#45a535',
      fillOpacity: 0,
      lineThickness: 3,
      circleRadius: 5,
      dashline: 0,
      showLabel: false,
      labelField: '',
      labelFont: 'Calibri',
      labelFontSize: 14,
      labelColor: '#000000',
      labelOpacity: 100,
      labelOutlineWidth: 3,
      labelOutlineColor: '#ffffff',
      labelOffsetX: 0,
      labelOffsetY: 0,
      labelText: 'normal',
      labelMaxResolution: 1200,
      labelAlign: 'center',
      labelBaseline: 'middle',
      labelRotationDegree: 0,
      labelFontWeight: 'normal',
      labelPlacement: 'point',
      labelMaxAngleDegree: 0.7853981633974483,
      labelOverflow: false,
      labelLineHeight: 1,
      icon: {},
      showSublayer: false,
      sublayerColumnName: '',
      sublayer: {},
      geometryType: 'LineString',
    },
    bbox: [85.3339292, 27.6472155, 85.3648767, 27.6658351],
    geom_type: 'LineString',
    sub_layer: [],
    theme: 479,
    checked: false,
  },
  // obstacleLayers: null,
  obstacleLayers: [
    {
      id: 484,
      name: 'Ward 1 Road Accident',
      layer_type: 'Vector',
      upload_status: 'successful',
      is_clean: false,
      icon: null,
      std_icon: null,
      style: {
        lineColor: '#2C675A',
        lineOpacity: 40,
        fillColor: '#629ebf',
        fillOpacity: 100,
        lineThickness: 1,
        circleRadius: 5,
        dashline: 0,
        showLabel: false,
        labelField: '',
        labelFont: 'Calibri',
        labelFontSize: 14,
        labelColor: '#000000',
        labelOpacity: 100,
        labelOutlineWidth: 3,
        labelOutlineColor: '#ffffff',
        labelOffsetX: 0,
        labelOffsetY: 0,
        labelText: 'normal',
        labelMaxResolution: 1200,
        labelAlign: 'center',
        labelBaseline: 'middle',
        labelRotationDegree: 0,
        labelFontWeight: 'normal',
        labelPlacement: 'point',
        labelMaxAngleDegree: 0.7853981633974483,
        labelOverflow: false,
        labelLineHeight: 1,
        icon: {},
        showSublayer: false,
        sublayerColumnName: '',
        sublayer: {},
        geometryType: 'Point',
      },
      bbox: [
        85.3956764454159, 27.69113336411893, 85.41450359557949,
        27.70364677960589,
      ],
      geom_type: 'Point',
      sub_layer: [],
      theme: 480,
      checked: false,
    },
  ],
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
    draft.analysisTaskId = null;
    draft.dataInput = initialState.dataInput;
    console.log(action.payload, 'payloadx');
  });

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
});

export default routeAnalysisReducer;
