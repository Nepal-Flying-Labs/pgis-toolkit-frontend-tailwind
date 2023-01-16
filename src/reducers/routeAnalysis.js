/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { Types } from '@Actions/routeAnalysis';
import {
  destinationPointColor,
  startingPointColor,
} from '@src/constants/analysis';

// const initialState = {
//   activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
//   dataInput: {
//     selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
//     originPointType: 'map', // 'search', 'map', 'layer'
//     drawPointType: null, // 'start', 'destination'
//     startGeojson: null,
//     destinationGeojson: null,
//     alternativePaths: null,
//     outputName: '',
//   },
//   results: {
//     analysisResults: [],
//   },
//   layers: {},
//   // roadNetworkLayer: null,
//   // obstacleLayers: null,
//   obstacleLayers: [],
//   analysisTaskId: null,
//   analysisId: null,
// };

const initialState = {
  activeTab: 'dataInput',
  dataInput: {
    selectedModeOfTransport: 'drive',
    originPointType: 'map',
    drawPointType: null,
    startGeojson: null,
    destinationGeojson: null,
    alternativePaths: null,
    outputName: '',
  },
  results: {
    analysisResults: [
      {
        id: 55,
        name: 'Result Route 12',
        geom_type: 'LineString',
        bbox: [85.3415354, 27.6547366, 85.3441952, 27.6620211],
        mode: 'drive',
        origin_long: 85.34265440082437,
        origin_lat: 27.65531132562036,
        destination_long: 85.34100386424133,
        destination_lat: 27.662149356982496,
        routes: [
          {
            id: 1,
            name: 'Optimal Route',
            data: [],
            checked: true,
          },
          {
            id: 2,
            name: 'Alternate Route',
            data: [
              {
                id: 85,
                route_no: 2,
                length: 0.01,
                travel_time: 0.01,
                is_optimum: false,
                obstacles:
                  '{"545": [10994, 10998, 10992, 11000], "546": [11004, 11007]}',
                bbox: [85.3415354, 27.6547366, 85.3441952, 27.6620211],
                name: 'Route 2',
                checked: true,
                style: {
                  lineColor: '#FF5A5F',
                  lineOpacity: '100',
                  fillColor: '#45a535',
                  fillOpacity: 0,
                  lineThickness: '2',
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
              },
              {
                id: 84,
                route_no: 1,
                length: 0.01,
                travel_time: 0.01,
                is_optimum: false,
                obstacles:
                  '{"545": [10994, 10998, 10992, 11000], "546": [11004, 11007]}',
                bbox: [85.3415354, 27.6547366, 85.3441952, 27.6620211],
                name: 'Route 1',
                checked: true,
                style: {
                  lineColor: '#FF5A5F',
                  lineOpacity: '100',
                  fillColor: '#45a535',
                  fillOpacity: 0,
                  lineThickness: '2',
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
              },
            ],
            checked: true,
          },
        ],
        checked: true,
      },
    ],
    zoomToRouteId: null,
  },
  layers: {},
  obstacleLayers: [
    {
      id: 545,
      name: 'Sample Obstacle 2',
      layer_type: 'Vector',
      upload_status: 'successful',
      is_clean: false,
      icon: null,
      std_icon: null,
      style: {
        lineColor: '#2C675A',
        lineOpacity: 100,
        fillColor: '#9f8999',
        fillOpacity: 100,
        lineThickness: 2,
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
        85.33781939802816, 27.652739899999965, 85.35413949999989,
        27.664180636852794,
      ],
      geom_type: 'Point',
      sub_layer: [],
      theme: 480,
      checked: true,
    },
    {
      id: 546,
      name: 'Sample Obstacle 3',
      layer_type: 'Vector',
      upload_status: 'successful',
      is_clean: false,
      icon: null,
      std_icon: null,
      style: {
        lineColor: '#2C675A',
        lineOpacity: 100,
        fillColor: '#7126e4',
        fillOpacity: 100,
        lineThickness: 2,
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
        85.33776889999996, 27.65237, 85.35316820000006, 27.662021100000022,
      ],
      geom_type: 'Point',
      sub_layer: [],
      theme: 480,
      checked: false,
    },
  ],
  analysisTaskId: null,
  analysisId: null,
  roadNetworkLayer: {
    id: 523,
    name: 'Sample Road Network',
    layer_type: 'Vector',
    upload_status: 'successful',
    is_clean: false,
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#9b2268',
      lineOpacity: '100',
      fillColor: '#45a535',
      fillOpacity: 0,
      lineThickness: '2',
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
    checked: true,
  },
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

const setResultsState = (state, action) => ({
  ...state,
  results: {
    ...state.results,
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
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
});

export default routeAnalysisReducer;
