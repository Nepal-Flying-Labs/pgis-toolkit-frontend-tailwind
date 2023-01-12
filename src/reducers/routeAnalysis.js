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
    id: 507,
    name: 'Null_geom_Large_Area',
    layer_type: 'Vector',
    upload_status: 'successful',
    is_clean: false,
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#2C675A',
      lineOpacity: 100,
      fillColor: '#f97d4a',
      fillOpacity: 100,
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
      geometryType: 'MultiLineString',
    },
    bbox: [
      85.39604534275621, 27.686313633829993, 85.41973471439125,
      27.71203178188435,
    ],
    geom_type: 'MultiLineString',
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

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
});

export default routeAnalysisReducer;
