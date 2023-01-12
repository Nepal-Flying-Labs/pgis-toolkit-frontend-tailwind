/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/routeAnalysis';
import produce from 'immer';

const initialState = {
  dataInput: {
    selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
    originPointType: 'map', // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startGeojson: null,
    destinationGeojson: null,
  },
  results: {},
  layers: {},
  // roadNetworkLayer: null,
  roadNetworkLayer: {
    id: 509,
    name: 'Other_geom_check_small',
    layer_type: 'Vector',
    upload_status: 'successful',
    is_clean: false,
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#2C675A',
      lineOpacity: 40,
      fillColor: '#f24675',
      fillOpacity: 0,
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
      geometryType: 'MultiLineString',
    },
    bbox: [
      85.44320388498414, 27.68996509433749, 85.46849581716032,
      27.71562359670412,
    ],
    geom_type: 'MultiLineString',
    sub_layer: [],
    theme: 479,
    checked: false,
  },
  // obstaclesLayers: null,
  obstaclesLayers: [
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
};

// const setDataInputState = (state, action) =>
//   produce(state, draft => {
//     draft.dataInput = action.payload;
//   });

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

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
});

export default routeAnalysisReducer;
