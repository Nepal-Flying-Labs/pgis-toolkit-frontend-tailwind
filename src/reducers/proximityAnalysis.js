/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { parse } from 'wkt';
import * as chroma from 'chroma-js';
import {
  proximityPolygonStyles,
  proximityPointStyles,
  proximityColors,
} from '@src/constants/analysis';
import { Types } from '@Actions/proximityAnalysis';
import { isEmpty } from '@Utils/commonUtils';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    originPointType: 'map', // 'search', 'map', 'layer'
    selectedOriginPointType: null, // 'search', 'map', 'layer'
    drawPoint: false,
    originGeojson: null,
    proximityRadius: 1,
    radiusUnit: 'meter',
    dissolveOutput: false,
    outputName: '',
  },
  results: {
    analysisResults: {
      next: null,
      previous: null,
      counts: 0,
      results: [],
    },
    // analysisResults: [analysisResultData],
    zoomToProximity: null,
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
  featureCollectionList: [],
  filter: {
    searchText: '',
    ordering: null,
  },
  selectedLayer: null,
  selectedCategory: null,
};

const setProximityAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setFilterState = (state, action) => ({
  ...state,
  filter: {
    ...state.filter,
    ...action.payload,
  },
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

const resetProximityAnalysisState = () => ({ ...initialState });

const applyProximityAnalysisSuccess = (state, action) =>
  produce(state, draft => {
    draft.analysisTaskId = action.payload.task_id;
  });

const handleCheckbox = (state, action) =>
  produce(state, draft => {
    const { stateName, id, checked } = action.payload;
    const selectedData = draft[stateName].find(item => item.id === +id);
    selectedData.checked = checked;
  });

function getTotalPoiChartData(data) {
  const totalPoiCountChartData = [];
  data.proximity_areas.forEach(proxarea => {
    proxarea.poi.forEach(poiArea => {
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
  return totalPoiCountChartData;
}

const checkProcessingStatusSuccess = (state, action) =>
  produce(state, draft => {
    const data = action.payload;
    const totalPoiCountChartData = getTotalPoiChartData(data);
    const { analysisType } = draft.inputQuery;
    const analysisResult = {
      ...data,
      checked: true,
      poiChartData: totalPoiCountChartData,
      proximity_areas: data.proximity_areas.map((areas, index) => ({
        ...areas,
        name: 'Area',
        checked: true,
        style: { ...proximityPolygonStyles },
        originStyle: {
          ...proximityPointStyles,
          fillColor: chroma.random().hex(),
        },
      })),
      inputQuery: draft.inputQuery,
    };

    // draft.dataInput = initialState.dataInput;
    draft.dataInput = { ...draft.dataInput, outputName: '' };

    draft.inputQuery = initialState.inputQuery;
    draft.results.analysisResults.results.unshift(analysisResult);
    const analysisResultStyle = draft.results.analysisResults.results.map(
      (result, i) => ({
        ...result,
        style: {
          ...proximityPolygonStyles,
          fillColor: proximityColors[i + 1] || chroma.random().hex(),
          fillOpacity: '50',
        },
      }),
    );
    draft.results.analysisResults.results = analysisResultStyle;
    draft.activeTab = 'results';
    draft.results.selectedResultId = analysisResult.id;
    draft.results.showResultsPopup = true;

    // draft.poiLayers = draft.poiLayers.map(item => ({
    //   ...item,
    //   checked: false,
    // }));
  });

const handleProximityCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, areaId, checked, name } = action.payload;
    const result = draft.results.analysisResults.results.find(
      item => item.id === resultId,
    );
    if (name === 'result') {
      result.checked = checked;
      result.proximity_areas.forEach(area => {
        area.checked = checked;
      });
      if (!checked) {
        draft.analysisId = null;
        draft.selectedRouteId = null;
      }
      return;
    }
    const area = result.proximity_areas.find(item => item.id === areaId);

    if (name === 'area') {
      area.checked = checked;
      const checkedAreas = result.proximity_areas.filter(item => item.checked);
      if (isEmpty(checkedAreas)) {
        result.checked = false;
      } else {
        result.checked = true;
      }
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

const saveProximityLayerSuccess = (state, action) =>
  produce(state, draft => {
    const { analysisId } = action.payload;
    draft.results.analysisResults = draft.results.analysisResults.filter(
      item => item.id !== analysisId,
    );
    draft.activeTab = 'layers';
    draft.selectedResultId = null;
    draft.results.showResultsPopup = false;
  });

const deleteProximityResult = (state, action) =>
  produce(state, draft => {
    const selectedId = draft.results.selectedResultId;
    if (selectedId === action.payload) {
      draft.results.showResultsPopup = false;
      draft.results.selectedResultId = null;
    }
    const newData = draft.results.analysisResults.results.filter(
      item => item.id !== action.payload,
    );
    draft.results.analysisResults.results = newData;
    if (newData.length < 1) {
      draft.activeTab = 'dataInput';
    }
  });

const getFeatureCollectionSuccess = (state, action) => {
  const featureList = action.payload;
  const listData = state.detailsListData;
  const newFeatureList = featureList.map(list => {
    const resultData = listData.data.find(datax => datax.id === list.id);
    if (resultData) {
      return {
        ...list,
        buffer_distance: resultData.buffer_distance,
        origin: resultData.origin,
      };
    }
    return list;
  });
  return {
    ...state,
    featureCollectionList: newFeatureList,
  };
};

function prepareResultsData(data, state) {
  const result = {
    ...data,
    checked: true,
    poiChartData: getTotalPoiChartData(data),
    proximity_areas: data.proximity_areas.map((areas, index) => ({
      ...areas,
      name: 'Area',
      checked: true,
      style: { ...proximityPolygonStyles },
      originStyle: {
        ...proximityPointStyles,
        fillColor: chroma.random().hex(),
      },
    })),
    style: {
      ...proximityPolygonStyles,
      fillColor: proximityColors[1] || chroma.random().hex(),
      fillOpacity: '50',
    },
  };
  return result;
}

const getAnalysisResultListSuccess = (state, action) =>
  produce(state, draft => {
    const { listData, individualDetail } = action.payload;
    const listDatax = produce(listData, listDraft => {
      listDraft.results[0] = prepareResultsData(
        {
          ...listDraft[0],
          ...individualDetail,
        },
        state,
      );
    });
    draft.results.analysisResults = listDatax;
    // draft.selectedRoadNetworkId = roadNetworkId;
  });

const proximityAnalysisReducer = createReducer(initialState, {
  [Types.SET_PROXIMITY_ANALYSIS_STATE]: setProximityAnalysisState,
  [Types.SET_FILTER_STATE]: setFilterState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.RESET_PROXIMITY_ANALYSIS_STATE]: resetProximityAnalysisState,
  [Types.APPLY_PROXIMITY_ANALYSIS_SUCCESS]: applyProximityAnalysisSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_PROXIMITY_CHECKBOX]: handleProximityCheckbox,
  [Types.SET_POPUP_ACTIVE_TAB]: setPopupActiveTab,
  [Types.GET_DETAILS_CATEGORY_SUCCESS]: getDetailsCategorySuccess,
  [Types.GET_DETAILS_CHART_SUCCESS]: getDetailsChartSuccess,
  [Types.GET_ANALYSIS_DATA_SUCCESS]: getAnalysisDataSuccess,
  [Types.GET_SELECTED_LAYER_FEATURE_SUCCESS]: getSelectedLayerFeatureSuccess,
  [Types.SAVE_PROXIMITY_LAYER_SUCCESS]: saveProximityLayerSuccess,
  [Types.DELETE_PROXIMITY_RESULT]: deleteProximityResult,
  [Types.GET_FEATURE_COLLECTION_SUCCESS]: getFeatureCollectionSuccess,
  [Types.GET_ANALYSIS_RESULT_LIST_SUCCESS]: getAnalysisResultListSuccess,
});

export default proximityAnalysisReducer;
