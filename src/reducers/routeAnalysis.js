/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { Types } from '@Actions/routeAnalysis';
import {
  destinationPointColor,
  startingPointColor,
  startPointStyles,
  obstaclePointColor,
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
    zoomToRouteId: null,
  },
  layers: {},
  // roadNetworkLayer: null,
  // obstacleLayers: null,
  obstacleLayers: [],
  analysisTaskId: null,
  analysisId: null,
  selectedRouteId: null,
  routePopupData: null,
};

// const initialState = {
//   activeTab: 'results',
//   dataInput: {
//     selectedModeOfTransport: 'drive',
//     originPointType: 'map',
//     drawPointType: null,
//     startGeojson: null,
//     destinationGeojson: null,
//     alternativePaths: null,
//     outputName: '',
//   },
//   results: {
//     analysisResults: [
//       {
//         id: 59,
//         name: 'Test Route X',
//         geom_type: 'LineString',
//         bbox: [85.3364869, 27.6520586, 85.3454204, 27.6642031],
//         mode: 'drive',
//         origin_long: 85.33652493191711,
//         origin_lat: 27.664159761637166,
//         destination_long: 85.34540726725261,
//         destination_lat: 27.65205610163801,
//         routes: [
//           {
//             id: 1,
//             name: 'Optimal Route',
//             data: [
//               {
//                 id: 96,
//                 route_no: 1,
//                 is_optimum: true,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [10998],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [11005, 11007],
//                   },
//                 ],
//                 name: 'Route 1',
//                 checked: false,
//                 style: {
//                   lineColor: '#00A699',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//             ],
//             checked: false,
//           },
//           {
//             id: 2,
//             name: 'Alternate Route',
//             data: [
//               {
//                 id: 97,
//                 route_no: 2,
//                 is_optimum: false,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [10998],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [11005, 11007],
//                   },
//                 ],
//                 name: 'Route 2',
//                 checked: false,
//                 style: {
//                   lineColor: '#FF5A5F',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//               {
//                 id: 98,
//                 route_no: 3,
//                 is_optimum: false,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [10998],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [11005, 11007],
//                   },
//                 ],
//                 name: 'Route 3',
//                 checked: false,
//                 style: {
//                   lineColor: '#FF5A5F',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//             ],
//             checked: false,
//           },
//         ],
//         checked: false,
//       },
//       {
//         id: 64,
//         name: 'Test Route Multiple',
//         geom_type: 'LineString',
//         bbox: [85.3467437, 27.6588639, 85.3507671, 27.6616054],
//         mode: 'drive',
//         origin_long: 85.3509667117063,
//         origin_lat: 27.660950379237136,
//         destination_long: 85.34667514527918,
//         destination_lat: 27.659041061288107,
//         routes: [
//           {
//             id: 1,
//             name: 'Optimal Route',
//             data: [
//               {
//                 id: 107,
//                 route_no: 1,
//                 is_optimum: true,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [11002],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [],
//                   },
//                 ],
//                 name: 'Route 1',
//                 checked: true,
//                 style: {
//                   lineColor: '#00A699',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//             ],
//             checked: true,
//           },
//           {
//             id: 2,
//             name: 'Alternate Route',
//             data: [
//               {
//                 id: 109,
//                 route_no: 3,
//                 is_optimum: false,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [],
//                   },
//                 ],
//                 name: 'Route 3',
//                 checked: false,
//                 style: {
//                   lineColor: '#FF5A5F',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//               {
//                 id: 108,
//                 route_no: 2,
//                 is_optimum: false,
//                 obstacles: [
//                   {
//                     layer_id: 545,
//                     feature_mirror_ids: [11002],
//                   },
//                   {
//                     layer_id: 546,
//                     feature_mirror_ids: [],
//                   },
//                 ],
//                 name: 'Route 2',
//                 checked: false,
//                 style: {
//                   lineColor: '#FF5A5F',
//                   lineOpacity: '100',
//                   fillColor: '#45a535',
//                   fillOpacity: 0,
//                   lineThickness: '3',
//                   circleRadius: 5,
//                   dashline: 0,
//                   showLabel: false,
//                   labelField: '',
//                   labelFont: 'Calibri',
//                   labelFontSize: 14,
//                   labelColor: '#000000',
//                   labelOpacity: 100,
//                   labelOutlineWidth: 3,
//                   labelOutlineColor: '#ffffff',
//                   labelOffsetX: 0,
//                   labelOffsetY: 0,
//                   labelText: 'normal',
//                   labelMaxResolution: 1200,
//                   labelAlign: 'center',
//                   labelBaseline: 'middle',
//                   labelRotationDegree: 0,
//                   labelFontWeight: 'normal',
//                   labelPlacement: 'point',
//                   labelMaxAngleDegree: 0.7853981633974483,
//                   labelOverflow: false,
//                   labelLineHeight: 1,
//                   icon: {},
//                   showSublayer: false,
//                   sublayerColumnName: '',
//                   sublayer: {},
//                   geometryType: 'LineString',
//                 },
//               },
//             ],
//             checked: false,
//           },
//         ],
//         checked: true,
//       },
//     ],
//     zoomToRouteId: null,
//   },
//   layers: {},
//   obstacleLayers: [
//     {
//       id: 545,
//       name: 'Sample Obstacle 2',
//       layer_type: 'Vector',
//       upload_status: 'successful',
//       is_clean: false,
//       icon: null,
//       std_icon: null,
//       style: {
//         lineColor: '#2C675A',
//         lineOpacity: 100,
//         fillColor: '#9f8999',
//         fillOpacity: 100,
//         lineThickness: 2,
//         circleRadius: 5,
//         dashline: 0,
//         showLabel: false,
//         labelField: '',
//         labelFont: 'Calibri',
//         labelFontSize: 14,
//         labelColor: '#000000',
//         labelOpacity: 100,
//         labelOutlineWidth: 3,
//         labelOutlineColor: '#ffffff',
//         labelOffsetX: 0,
//         labelOffsetY: 0,
//         labelText: 'normal',
//         labelMaxResolution: 1200,
//         labelAlign: 'center',
//         labelBaseline: 'middle',
//         labelRotationDegree: 0,
//         labelFontWeight: 'normal',
//         labelPlacement: 'point',
//         labelMaxAngleDegree: 0.7853981633974483,
//         labelOverflow: false,
//         labelLineHeight: 1,
//         icon: {},
//         showSublayer: false,
//         sublayerColumnName: '',
//         sublayer: {},
//         geometryType: 'Point',
//       },
//       bbox: [
//         85.33781939802816, 27.652739899999965, 85.35413949999989,
//         27.664180636852794,
//       ],
//       geom_type: 'Point',
//       sub_layer: [],
//       theme: 480,
//       checked: true,
//     },
//     {
//       id: 546,
//       name: 'Sample Obstacle 3',
//       layer_type: 'Vector',
//       upload_status: 'successful',
//       is_clean: false,
//       icon: null,
//       std_icon: null,
//       style: {
//         lineColor: '#2C675A',
//         lineOpacity: 100,
//         fillColor: '#7126e4',
//         fillOpacity: 100,
//         lineThickness: 2,
//         circleRadius: 5,
//         dashline: 0,
//         showLabel: false,
//         labelField: '',
//         labelFont: 'Calibri',
//         labelFontSize: 14,
//         labelColor: '#000000',
//         labelOpacity: 100,
//         labelOutlineWidth: 3,
//         labelOutlineColor: '#ffffff',
//         labelOffsetX: 0,
//         labelOffsetY: 0,
//         labelText: 'normal',
//         labelMaxResolution: 1200,
//         labelAlign: 'center',
//         labelBaseline: 'middle',
//         labelRotationDegree: 0,
//         labelFontWeight: 'normal',
//         labelPlacement: 'point',
//         labelMaxAngleDegree: 0.7853981633974483,
//         labelOverflow: false,
//         labelLineHeight: 1,
//         icon: {},
//         showSublayer: false,
//         sublayerColumnName: '',
//         sublayer: {},
//         geometryType: 'Point',
//       },
//       bbox: [
//         85.33776889999996, 27.65237, 85.35316820000006, 27.662021100000022,
//       ],
//       geom_type: 'Point',
//       sub_layer: [],
//       theme: 480,
//       checked: true,
//     },
//   ],
//   analysisTaskId: null,
//   analysisId: null,
//   roadNetworkLayer: {
//     id: 523,
//     name: 'Sample Road Network',
//     layer_type: 'Vector',
//     upload_status: 'successful',
//     is_clean: false,
//     icon: null,
//     std_icon: null,
//     style: {
//       lineColor: '#9b2268',
//       lineOpacity: '100',
//       fillColor: '#45a535',
//       fillOpacity: 0,
//       lineThickness: '2',
//       circleRadius: 5,
//       dashline: 0,
//       showLabel: false,
//       labelField: '',
//       labelFont: 'Calibri',
//       labelFontSize: 14,
//       labelColor: '#000000',
//       labelOpacity: 100,
//       labelOutlineWidth: 3,
//       labelOutlineColor: '#ffffff',
//       labelOffsetX: 0,
//       labelOffsetY: 0,
//       labelText: 'normal',
//       labelMaxResolution: 1200,
//       labelAlign: 'center',
//       labelBaseline: 'middle',
//       labelRotationDegree: 0,
//       labelFontWeight: 'normal',
//       labelPlacement: 'point',
//       labelMaxAngleDegree: 0.7853981633974483,
//       labelOverflow: false,
//       labelLineHeight: 1,
//       icon: {},
//       showSublayer: false,
//       sublayerColumnName: '',
//       sublayer: {},
//       geometryType: 'LineString',
//     },
//     bbox: [85.3339292, 27.6472155, 85.3648767, 27.6658351],
//     geom_type: 'LineString',
//     sub_layer: [],
//     theme: 479,
//     checked: true,
//   },
//   selectedRouteId: 107,
//   routePopupData: {
//     id: 107,
//     route_no: 1,
//     length: 0.01,
//     travel_time: 0.01,
//     is_optimum: true,
//     origin: '(85.3509667117063, 27.660950379237136)',
//     destination: '(85.34667514527918, 27.659041061288107)',
//     obstacles: [
//       {
//         layer_id: 545,
//         feature_mirror_ids: [11002],
//         layer_name: 'Sample Obstacle 2',
//         count: 1,
//         checked: true,
//       },
//       {
//         layer_id: 546,
//         feature_mirror_ids: [],
//         layer_name: 'Sample Obstacle 3',
//         count: 0,
//         checked: true,
//       },
//     ],
//   },
// };

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
                lineThickness: +draft.roadNetworkLayer.style.lineThickness + 2,
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
                lineThickness: +draft.roadNetworkLayer.style.lineThickness + 2,
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

const handleRouteCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, routeId, dataId, checked, name } = action.payload;
    const result = draft.results.analysisResults.find(
      item => item.id === resultId,
    );
    if (name === 'result') {
      result.checked = checked;
      result.routes.forEach(route => {
        route.checked = checked;
        route.data.forEach(item => {
          item.checked = checked;
        });
      });
      return;
    }
    const route = result.routes.find(item => item.id === routeId);
    if (name === 'route') {
      route.checked = checked;
      route.data.forEach(item => {
        item.checked = checked;
      });
      return;
    }
    if (name === 'data') {
      const data = route.data.find(item => item.id === dataId);
      data.checked = checked;
    }
  });

const getRoutePopupDataSuccess = (state, action) => {
  const data = action.payload;
  return produce(state, draft => {
    draft.routePopupData = {
      ...data,
      obstacles: data.obstacles.map(item => ({
        ...item,
        checked: true,
        style: { ...startPointStyles, fillColor: obstaclePointColor },
      })),
    };
  });
};

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
  [Types.GET_ROUTE_POPUP_DATA_SUCCESS]: getRoutePopupDataSuccess,
});

export default routeAnalysisReducer;
