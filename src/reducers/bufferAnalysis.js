/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import {
  bufferPolygonStyles,
  bufferPointStyles,
  bufferColors,
} from '@src/constants/analysis';
import * as chroma from 'chroma-js';
import { Types } from '@Actions/bufferAnalysis';

const analysisResultData = {
  id: 212,
  name: 'asdasdsadasd',
  geom_type: 'Polygon',
  bbox: [
    85.40116615866097, 27.671564339464926, 85.44653467423171, 27.68814592462181,
  ],
  total_area: 6273096.981090842,
  buffer_areas: [
    {
      id: 99,
      area: 3136548.490545421,
      bbox: [
        85.42856836854932, 27.67223578572009, 85.44653467423171,
        27.68814592462181,
      ],
      origin: [[85.43755152139053, 27.680191144864907]],
      poi: [
        {
          layer_id: 463,
          layer_name: 'Education',
          feature_mirror_ids: [],
        },
        {
          layer_id: 464,
          layer_name: 'Health Institution',
          feature_mirror_ids: [],
        },
        {
          layer_id: 466,
          layer_name: 'Finance Institution',
          feature_mirror_ids: [],
        },
        {
          layer_id: 468,
          layer_name: 'Industries',
          feature_mirror_ids: [13574, 13575, 13576, 13577, 13545],
        },
        {
          layer_id: 474,
          layer_name: 'OpenSpace',
          feature_mirror_ids: [],
        },
        {
          layer_id: 478,
          layer_name: 'Local Government Office',
          feature_mirror_ids: [],
        },
      ],
      name: 'Result Area 1',
      checked: true,
      style: {
        lineColor: '#FFFFFF',
        lineOpacity: 100,
        fillColor: '#FF5A5F',
        fillOpacity: 33,
        lineThickness: 2,
        circleRadius: 8,
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
      },
      originStyle: {
        lineColor: '#FFFFFF',
        lineOpacity: 100,
        fillColor: '#57cc05',
        fillOpacity: 100,
        lineThickness: 2,
        circleRadius: 8,
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
      },
    },
    {
      id: 100,
      area: 3136548.490545421,
      bbox: [
        85.40116615866097, 27.671564339464926, 85.41913246434338,
        27.687474576164703,
      ],
      origin: [[85.41014931150217, 27.679519747504074]],
      poi: [
        {
          layer_id: 463,
          layer_name: 'Education',
          feature_mirror_ids: [13412, 13399, 13404, 13406],
        },
        {
          layer_id: 464,
          layer_name: 'Health Institution',
          feature_mirror_ids: [13296, 13298, 13299, 13300, 13291],
        },
        {
          layer_id: 466,
          layer_name: 'Finance Institution',
          feature_mirror_ids: [13349, 13351, 13352, 13353, 13354, 13355, 13357],
        },
        {
          layer_id: 468,
          layer_name: 'Industries',
          feature_mirror_ids: [
            13562, 13563, 13554, 13556, 13557, 13558, 13564, 13565, 13566,
          ],
        },
        {
          layer_id: 474,
          layer_name: 'OpenSpace',
          feature_mirror_ids: [13504],
        },
        {
          layer_id: 478,
          layer_name: 'Local Government Office',
          feature_mirror_ids: [],
        },
      ],
      name: 'Result Area 2',
      checked: true,
      style: {
        lineColor: '#FFFFFF',
        lineOpacity: 100,
        fillColor: '#FF5A5F',
        fillOpacity: 33,
        lineThickness: 2,
        circleRadius: 8,
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
      },
      originStyle: {
        lineColor: '#FFFFFF',
        lineOpacity: 100,
        fillColor: '#b6fcfd',
        fillOpacity: 100,
        lineThickness: 2,
        circleRadius: 8,
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
      },
    },
  ],
  checked: true,
  style: {
    lineColor: '#FFFFFF',
    lineOpacity: 100,
    fillColor: 'DFF2F1',
    fillOpacity: '50',
    lineThickness: 2,
    circleRadius: 8,
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
  },
};

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
  results: {
    analysisResults: [],
    // analysisResults: [analysisResultData],
    zoomToBuffer: null,
    showResultsPopup: false,
    selectedResultId: null,
    selectedAnalysis: null,
    individualAnalysisData: null,
  },
  analysisTaskId: null,
  poiLayers: [],
  popupActiveTab: 'Summary',
  detailsCategory: [],
  detailsChartData: {},
  detailsListData: [],
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

const setResultsState = (state, action) => ({
  ...state,
  results: {
    ...state.results,
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
    const totalPoiCountChartData = [];
    const data = action.payload;
    data.buffer_areas.forEach(bufarea => {
      bufarea.poi.forEach(poiArea => {
        const existingLayerCheck = totalPoiCountChartData.findIndex(
          layer => layer.name === poiArea.layer_name,
        );
        if (existingLayerCheck !== -1) {
          totalPoiCountChartData[existingLayerCheck].count +=
            poiArea.feature_mirror_ids.length;
        } else {
          totalPoiCountChartData.push({
            name: poiArea.layer_name,
            count: poiArea.feature_mirror_ids.length,
          });
        }
      });
    });
    const analysisResult = {
      ...data,
      checked: true,
      poiChartData: totalPoiCountChartData,
      buffer_areas: data.buffer_areas.map((areas, index) => ({
        ...areas,
        name: `Result Area ${index + 1}`,
        checked: true,
        style: { ...bufferPolygonStyles },
        originStyle: { ...bufferPointStyles, fillColor: chroma.random().hex() },
      })),
    };

    draft.dataInput = initialState.dataInput;
    draft.results.analysisResults = [
      ...draft.results.analysisResults,
      analysisResult,
    ];
    const analysisResultStyle = draft.results.analysisResults.map(
      (result, i) => ({
        ...result,
        style: {
          ...bufferPolygonStyles,
          fillColor: bufferColors[i + 1] || chroma.random().hex(),
          fillOpacity: '50',
        },
      }),
    );
    draft.results.analysisResults = analysisResultStyle;
    draft.activeTab = 'results';
    draft.results.selectedResultId = analysisResult.id;
    draft.results.showResultsPopup = true;

    draft.poiLayers = draft.poiLayers.map(item => ({
      ...item,
      checked: false,
    }));
  });

const handleRouteCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, areaId, checked, name } = action.payload;
    const result = draft.results.analysisResults.find(
      item => item.id === resultId,
    );
    if (name === 'result') {
      result.checked = checked;
      result.buffer_areas.forEach(area => {
        area.checked = checked;
      });
      if (!checked) {
        draft.analysisId = null;
        draft.selectedRouteId = null;
      }
      return;
    }
    const area = result.buffer_areas.find(item => item.id === areaId);

    if (name === 'area') {
      area.checked = checked;
    }
  });
const setPopupActiveTab = (state, action) => ({
  ...state,
  popupActiveTab: action.payload,
});
const getDetailsCategorySuccess = (state, action) => ({
  ...state,
  detailsCategory: action.payload,
});
const getDetailsChartSuccess = (state, action) => {
  if (action?.payload?.key === 'chart') {
    return {
      ...state,
      detailsChartData: action.payload,
    };
  } else {
    return {
      ...state,
      detailsListData: action.payload,
    };
  }
};

const getAnalysisDataSuccess = (state, action) =>
  produce(state, draft => {
    draft.results.individualAnalysisData = action.payload;
  });

const bufferAnalysisReducer = createReducer(initialState, {
  [Types.SET_BUFFER_ANALYSIS_STATE]: setBufferAnalysisState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.RESET_BUFFER_ANALYSIS_STATE]: resetBufferAnalysisState,
  [Types.APPLY_BUFFER_ANALYSIS_SUCCESS]: applyBufferAnalysisSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
  [Types.SET_POPUP_ACTIVE_TAB]: setPopupActiveTab,
  [Types.GET_DETAILS_CATEGORY_SUCCESS]: getDetailsCategorySuccess,
  [Types.GET_DETAILS_CHART_SUCCESS]: getDetailsChartSuccess,
  [Types.GET_ANALYSIS_DATA_SUCCESS]: getAnalysisDataSuccess,
});

export default bufferAnalysisReducer;
