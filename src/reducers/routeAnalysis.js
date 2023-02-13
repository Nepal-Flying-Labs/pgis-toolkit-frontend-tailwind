/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { parse } from 'wkt';
import { Types } from '@Actions/routeAnalysis';
import {
  startPointStyles,
  obstaclePointColor,
  routeColors,
} from '@src/constants/analysis';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    selectedModeOfTransport: 'drive', // 'drive', 'cycle', 'walk'
    originPointType: 'search', // 'search', 'map', 'layer'
    selectedOriginPointType: null, // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startingPoint: null, // { id: '', name: '', geojson: null }
    destinationPoint: null, // { id: '', name: '', geojson: null }
    selectedLayerType: null, // 'startingPoint', 'destinationPoint'
    alternativePaths: 1,
    outputName: '',
  },
  results: {
    analysisResults: [
      {
        id: 377,
        name: 'route analysis 1617',
        geom_type: 'LineString',
        bbox: [85.4237921, 27.6775955, 85.4848759, 27.7148212],
        mode: 'drive',
        origin_long: 85.42455710880755,
        origin_lat: 27.714826158642794,
        destination_long: 85.48483742355545,
        destination_lat: 27.678569042282035,
        route_origin: [27.7148212, 85.4241541],
        route_destination: [27.67851, 85.4848759],
        routes: [
          {
            id: 1,
            name: 'Optimal Route',
            data: [
              {
                id: 330,
                route_no: 1,
                is_optimum: true,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 1',
                checked: true,
                style: {
                  lineColor: '#00A699',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
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
                id: 331,
                route_no: 2,
                is_optimum: false,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 2',
                checked: true,
                style: {
                  lineColor: '#FF5A5F',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
                },
              },
              {
                id: 332,
                route_no: 3,
                is_optimum: false,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 3',
                checked: true,
                style: {
                  lineColor: '#AB47BC',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
                },
              },
            ],
            checked: true,
          },
        ],
        checked: true,
      },
      {
        id: 378,
        name: 'route analysis 1618',
        geom_type: 'LineString',
        bbox: [85.4237921, 27.6775955, 85.4848759, 27.7148212],
        mode: 'drive',
        origin_long: 85.42455710880755,
        origin_lat: 27.714826158642794,
        destination_long: 85.48483742355545,
        destination_lat: 27.678569042282035,
        route_origin: [27.7148212, 85.4241541],
        route_destination: [27.67851, 85.4848759],
        routes: [
          {
            id: 1,
            name: 'Optimal Route',
            data: [
              {
                id: 330,
                route_no: 1,
                is_optimum: true,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 2',
                checked: true,
                style: {
                  lineColor: '#00A699',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
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
                id: 331,
                route_no: 2,
                is_optimum: false,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 2',
                checked: true,
                style: {
                  lineColor: '#FF5A5F',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
                },
              },
              {
                id: 332,
                route_no: 3,
                is_optimum: false,
                obstacles: [
                  {
                    layer_id: 484,
                    feature_mirror_ids: [14704],
                  },
                ],
                name: 'Route 3',
                checked: true,
                style: {
                  lineColor: '#AB47BC',
                  lineOpacity: 100,
                  fillColor: '#f54678',
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
                  geometryType: 'MultiLineString',
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
    selectedAnalysis: null,
    individualAnalysisData: null,
  },
  roadNetworkLayer: null,
  obstacleLayers: [],
  analysisId: null,
  selectedRouteId: null, // route id for fetching route popup data
  routePopupData: null, // data for route popup
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

const checkProcessingStatusSuccess = (state, action) =>
  produce(state, draft => {
    let optimalRouteId = null;
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
            .map(item => {
              optimalRouteId = item.id;
              return {
                ...item,
                name: `Route ${item.route_no}`,
                checked: true,
                style: {
                  ...draft.roadNetworkLayer.style,
                  lineColor: routeColors[item.route_no],
                  lineThickness:
                    +draft.roadNetworkLayer.style.lineThickness + 2,
                },
              };
            }),
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
                lineColor: routeColors[item.route_no],
                lineThickness: +draft.roadNetworkLayer.style.lineThickness + 2,
              },
            })),
          checked: true,
        },
      ],
    };
    draft.dataInput = initialState.dataInput;
    draft.results.analysisResults = [
      analysisResult,
      ...draft.results.analysisResults,
    ];
    draft.results.zoomToRouteId = analysisResult.id;
    draft.activeTab = 'results';
    draft.selectedRouteId = optimalRouteId;
    draft.obstacleLayers = draft.obstacleLayers.map(item => ({
      ...item,
      checked: false,
    }));
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
      if (!checked) {
        draft.analysisId = null;
        draft.selectedRouteId = null;
      }
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

const handleObstaclesToggle = (state, action) => {
  const { layerId, checked } = action.payload;
  return produce(state, draft => {
    const obstacle = draft.routePopupData.obstacles.find(
      item => item.layer_id === layerId,
    );
    obstacle.checked = checked;
  });
};

const getAnalysisDataSuccess = (state, action) =>
  produce(state, draft => {
    draft.results.individualAnalysisData = action.payload;
  });

const saveRouteLayerSuccess = (state, action) =>
  produce(state, draft => {
    const { analysisId } = action.payload;
    draft.results.analysisResults = draft.results.analysisResults.filter(
      item => item.id !== analysisId,
    );
    draft.activeTab = 'layers';
    draft.selectedRouteId = null;
    draft.routePopupData = null;
  });

function getAttributeName(attributes) {
  return attributes?.name || attributes?.Name;
}

const getSelectedLayerFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const { geometry, attributes, id } = action.payload;
    const { selectedLayerType } = state.dataInput;
    const geojson = parse(geometry);
    draft.dataInput[selectedLayerType] = {
      id: '',
      name: getAttributeName(attributes) || id,
      geojson,
    };
    draft.dataInput.selectedLayerType = null;
    draft.dataInput.selectedOriginPointType = 'layer';
  });

const deleteRouteResult = (state, action) =>
  produce(state, draft => {
    const { selectedAnalysis } = draft.results;
    if (selectedAnalysis.id === action.payload) {
      draft.routePopupData = null;
      draft.selectedRouteId = null;
      draft.results.selectedAnalysis = null;
    }
    const newData = draft.results.analysisResults.filter(
      item => item.id !== action.payload,
    );
    draft.results.analysisResults = newData;
    if (newData.length < 1) {
      draft.activeTab = 'dataInput';
    }
  });

const routeAnalysisReducer = createReducer(initialState, {
  [Types.SET_ROUTE_ANALYSIS_STATE]: setRouteAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.RESET_ROUTE_ANALYSIS_STATE]: resetRouteAnalysisState,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
  [Types.GET_ROUTE_POPUP_DATA_SUCCESS]: getRoutePopupDataSuccess,
  [Types.HANDLE_OBSTACLES_TOGGLE]: handleObstaclesToggle,
  [Types.GET_ANALYSIS_DATA_SUCCESS]: getAnalysisDataSuccess,
  [Types.SAVE_ROUTE_LAYER_SUCCESS]: saveRouteLayerSuccess,
  [Types.GET_SELECTED_LAYER_FEATURE_SUCCESS]: getSelectedLayerFeatureSuccess,
  [Types.DELETE_ROUTE_RESULT]: deleteRouteResult,
});

export default routeAnalysisReducer;
