/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import {
  bufferPolygonStyles,
  bufferPointStyles,
  bufferColors,
} from '@src/constants/analysis';
import { parse } from 'wkt';
import * as chroma from 'chroma-js';
import { Types } from '@Actions/bufferAnalysis';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    originPointType: 'map', // 'search', 'map', 'layer'
    selectedOriginPointType: null, // 'search', 'map', 'layer'
    drawPoint: false,
    originGeojson: null,
    bufferRadius: 1,
    dissolveOutput: false,
    outputName: '',
  },
  results: {
    analysisResults: [
      {
        id: 440,
        name: 'buffer 12567',
        geom_type: 'Polygon',
        bbox: [
          85.41281976917185, 27.678455815624297, 85.50197920520307,
          27.713596601123413,
        ],
        total_area: 9409645.471636262,
        buffer_areas: [
          {
            id: 454,
            area: 3136548.490545421,
            bbox: [
              85.41281976917185, 27.697690171336316, 85.43078607485424,
              27.713596601123413,
            ],
            origin: [[85.42180292201304, 27.705643676101516]],
            poi: [
              {
                layer_id: 687,
                layer_name: 'Education Institutions',
                feature_mirror_ids: [95763, 95766, 95779, 95780, 95781, 95782],
              },
              {
                layer_id: 691,
                layer_name: 'Finance',
                feature_mirror_ids: [87451, 87450, 87425],
              },
              {
                layer_id: 733,
                layer_name: 'finance5',
                feature_mirror_ids: [],
              },
            ],
            name: 'Buffer Point 1',
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
              fillColor: '#c68952',
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
            id: 455,
            area: 3136548.490545421,
            bbox: [
              85.48401289952066, 27.689315820490016, 85.50197920520307,
              27.705223470901608,
            ],
            origin: [[85.49299605236187, 27.697269935509027]],
            poi: [
              {
                layer_id: 687,
                layer_name: 'Education Institutions',
                feature_mirror_ids: [95761, 95797, 95798],
              },
              {
                layer_id: 691,
                layer_name: 'Finance',
                feature_mirror_ids: [],
              },
              {
                layer_id: 733,
                layer_name: 'finance5',
                feature_mirror_ids: [],
              },
            ],
            name: 'Buffer Point 2',
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
              fillColor: '#c1fe2d',
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
            id: 456,
            area: 3136548.490545421,
            bbox: [
              85.4425442002372, 27.678455815624297, 85.4605105059196,
              27.694365048457136,
            ],
            origin: [[85.45152735307839, 27.686410721778117]],
            poi: [
              {
                layer_id: 687,
                layer_name: 'Education Institutions',
                feature_mirror_ids: [95813, 95788],
              },
              {
                layer_id: 691,
                layer_name: 'Finance',
                feature_mirror_ids: [87429],
              },
              {
                layer_id: 733,
                layer_name: 'finance5',
                feature_mirror_ids: [103309],
              },
            ],
            name: 'Buffer Point 3',
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
              fillColor: '#994cea',
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
        poiChartData: [
          {
            name: 'Education Institutions',
            count: 11,
          },
          {
            name: 'Finance',
            count: 4,
          },
          {
            name: 'finance5',
            count: 1,
          },
        ],
        inputQuery: {
          origins: [
            [85.42180292201304, 27.705643676101516],
            [85.49299605236187, 27.697269935509027],
            [85.45152735307839, 27.686410721778117],
          ],
          dissolve_output: false,
          radius: 1000,
          name: 'buffer 12567',
          project: '295',
          pois: [691, 733, 687],
          type: 'buffer',
          selectedPOIName: ['Finance', 'finance5', 'Education Institutions'],
        },
        style: {
          lineColor: '#FFFFFF',
          lineOpacity: 100,
          fillColor: '#FF5A5F',
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
      },
    ],
    // analysisResults: [analysisResultData],
    zoomToBuffer: null,
    showResultsPopup: false,
    selectedResultId: null,
    selectedAnalysis: null,
    individualAnalysisData: null,
  },
  inputQuery: null,
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
        name: `Buffer Point ${index + 1}`,
        checked: true,
        style: { ...bufferPolygonStyles },
        originStyle: { ...bufferPointStyles, fillColor: chroma.random().hex() },
      })),
      inputQuery: draft.inputQuery,
    };

    draft.dataInput = initialState.dataInput;
    draft.inputQuery = initialState.inputQuery;
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
  }
  return {
    ...state,
    detailsListData: action.payload,
  };
};

const getAnalysisDataSuccess = (state, action) =>
  produce(state, draft => {
    draft.results.individualAnalysisData = action.payload;
  });

function getAttributeName(attributes) {
  return attributes?.name || attributes?.Name;
}

const getSelectedLayerFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const { originGeojson } = draft.dataInput;
    const data = action.payload;
    const newData = data.map((item, index) => {
      const { geometry, attributes, id } = item;
      const geojson = parse(geometry);
      const originLength = originGeojson?.length || 0;

      return {
        id: originLength + (index + 1),
        name: getAttributeName(attributes) || id,
        geojson: { ...geojson, geometry: { coordinates: geojson.coordinates } },
      };
    });

    draft.dataInput.originGeojson = originGeojson
      ? [...originGeojson, ...newData]
      : newData;
  });

const saveBufferLayerSuccess = (state, action) =>
  produce(state, draft => {
    const { analysisId } = action.payload;
    draft.results.analysisResults = draft.results.analysisResults.filter(
      item => item.id !== analysisId,
    );
    draft.activeTab = 'layers';
    draft.selectedResultId = null;
    draft.results.showResultsPopup = false;
  });

const deleteBufferResult = (state, action) =>
  produce(state, draft => {
    const selectedId = draft.results.selectedResultId;
    if (selectedId === action.payload) {
      draft.results.showResultsPopup = false;
      draft.results.selectedResultId = null;
    }
    const newData = draft.results.analysisResults.filter(
      item => item.id !== action.payload,
    );
    draft.results.analysisResults = newData;
    if (newData.length < 1) {
      draft.activeTab = 'dataInput';
    }
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
  [Types.GET_SELECTED_LAYER_FEATURE_SUCCESS]: getSelectedLayerFeatureSuccess,
  [Types.SAVE_BUFFER_LAYER_SUCCESS]: saveBufferLayerSuccess,
  [Types.DELETE_BUFFER_RESULT]: deleteBufferResult,
});

export default bufferAnalysisReducer;
