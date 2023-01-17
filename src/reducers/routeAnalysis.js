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
//     zoomToRouteId: null,
//   },
//   layers: {},
//   roadNetworkLayer: null,
//   obstacleLayers: [],
//   analysisTaskId: null,
//   analysisId: null,
//   selectedRoute: null,
//   routePopupData: null,
// };

const initialState = {
  activeTab: 'results',
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
        id: 70,
        name: 'Test Route 321',
        geom_type: 'LineString',
        bbox: [85.3392192, 27.6547596, 85.3418599, 27.66338],
        mode: 'drive',
        origin_long: 85.33983303201467,
        origin_lat: 27.664104296819602,
        destination_long: 85.33999627115998,
        destination_lat: 27.654658074154796,
        routes: [
          {
            id: 1,
            name: 'Optimal Route',
            data: [
              {
                id: 120,
                route_no: 1,
                is_optimum: true,
                obstacles: [
                  {
                    layer_id: 545,
                    feature_mirror_ids: [],
                  },
                  {
                    layer_id: 546,
                    feature_mirror_ids: [11004, 11005],
                  },
                ],
                name: 'Route 1',
                checked: true,
                style: {
                  lineColor: '#00A699',
                  lineOpacity: '100',
                  fillColor: '#45a535',
                  fillOpacity: 0,
                  lineThickness: 4,
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
          {
            id: 2,
            name: 'Alternate Route',
            data: [
              {
                id: 121,
                route_no: 2,
                is_optimum: false,
                obstacles: [
                  {
                    layer_id: 545,
                    feature_mirror_ids: [],
                  },
                  {
                    layer_id: 546,
                    feature_mirror_ids: [11004, 11005],
                  },
                ],
                name: 'Route 2',
                checked: true,
                style: {
                  lineColor: '#FF5A5F',
                  lineOpacity: '100',
                  fillColor: '#45a535',
                  fillOpacity: 0,
                  lineThickness: 4,
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
      checked: true,
    },
  ],
  analysisTaskId: null,
  analysisId: null,
  selectedRoute: null,
  routePopupData: null,
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

const resetRouteAnalysisState = () => ({ ...initialState });

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
    draft.results.analysisResults.push(analysisResult);
    draft.results.zoomToRouteId = analysisResult.id;
    draft.activeTab = 'results';
  });

const handleRouteCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, routeId, dataId, obstacleId, checked, name } =
      action.payload;
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
    if (name === 'obstacle') {
      const allRoutes = result.routes
        .reduce((arr, item) => [...arr, ...item.data.map(i => i.obstacles)], [])
        .flat();
      const obstacle = allRoutes.find(item => item.layer_id === obstacleId);
      obstacle.checked = checked;
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
  [Types.RESET_ROUTE_ANALYSIS_STATE]: resetRouteAnalysisState,
  [Types.APPLY_ROUTE_ANALYSIS_SUCCESS]: applyRouteAnalysisSuccess,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
  [Types.GET_ROUTE_POPUP_DATA_SUCCESS]: getRoutePopupDataSuccess,
});

export default routeAnalysisReducer;
