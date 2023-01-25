/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
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
    originPointType: 'map', // 'search', 'map', 'layer'
    drawPointType: null, // 'start', 'destination'
    startGeojson: null,
    destinationGeojson: null,
    alternativePaths: 1,
    outputName: '',
  },
  results: {
    analysisResults: [],
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
});

export default routeAnalysisReducer;
