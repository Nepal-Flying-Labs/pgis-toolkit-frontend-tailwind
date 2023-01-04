import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';
import { checkErrorData } from '@src/constants/analysis';

const initialState = {
  stepIndex: 1,
  optimalRoute: {
    selectedRoadLayer: {
      // id: 483,
      // name: 'Ward 1 Roads',
      // layer_type: 'Vector',
      // upload_status: 'successful',
      // bbox: [
      //   85.39604534275621, 27.686313633829993, 85.41973471439125,
      //   27.71203178188435,
      // ],
      // geom_type: 'LineString',
      // sub_layer: [],
      // style: {
      //   lineColor: '#2C675A',
      //   lineOpacity: 40,
      //   fillColor: '#f61f73',
      //   fillOpacity: 0,
      //   lineThickness: 1,
      //   circleRadius: 5,
      //   dashline: 0,
      //   showLabel: false,
      //   labelField: '',
      //   labelFont: 'Calibri',
      //   labelFontSize: 14,
      //   labelColor: '#000000',
      //   labelOpacity: 100,
      //   labelOutlineWidth: 3,
      //   labelOutlineColor: '#ffffff',
      //   labelOffsetX: 0,
      //   labelOffsetY: 0,
      //   labelText: 'normal',
      //   labelMaxResolution: 1200,
      //   labelAlign: 'center',
      //   labelBaseline: 'middle',
      //   labelRotationDegree: 0,
      //   labelFontWeight: 'normal',
      //   labelPlacement: 'point',
      //   labelMaxAngleDegree: 0.7853981633974483,
      //   labelOverflow: false,
      //   labelLineHeight: 1,
      //   icon: {},
      //   showSublayer: false,
      //   sublayerColumnName: '',
      //   sublayer: {},
      //   geometryType: 'LineString',
      // },
      // theme: 479,
      // checked: false,
    },
    selectedObstacleLayers: [], // []
  },
  errorStates: {},
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setOptimalRouteState = (state, action) => ({
  ...state,
  optimalRoute: {
    ...state.optimalRoute,
    ...action.payload,
  },
});

const setErrorStates = (state, action) => {
  const id = action.payload;
  return {
    ...state,
    errorStates: {
      ...state.errorStates,
      [id]: checkErrorData.map(item => ({
        ...item,
        status: 'waiting',
        errorData: null,
        totalData: null,
      })),
    },
  };
};

const setErrorCheckingStatus = (state, action) => {
  const { layerId, apiEndPoint, status } = action.payload;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.apiEndPoint === apiEndPoint
        ? {
            ...item,
            status,
          }
        : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const checkErrorSuccess = (state, action) => {
  const data = action.payload;
  const { layerId } = data;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.apiEndPoint === data.apiEndPoint
        ? {
            ...item,
            errorData: data.error_data,
            totalData: data.total_data,
            status: 'error',
          }
        : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
  [Types.SET_OPTIMAL_ROUTE_STATE]: setOptimalRouteState,
  [Types.SET_ERROR_STATES]: setErrorStates,
  [Types.CHECK_ERROR_SUCCESS]: checkErrorSuccess,
  [Types.SET_ERROR_CHECKING_STATUS]: setErrorCheckingStatus,
});

export default analysisReducer;
