import { call, put, takeLatest, select } from 'redux-saga/effects';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import analysisActions from '@Actions/analysis';
import commonActions from '@Actions/common';
import {
  getNetworkRoute,
  getNetworkRouteCollection,
  optimumRouteAnalysis,
  saveRouteLayer,
  downloadOptimumRouteAnalysis,
} from '@Services/routeAnalysis';
import toastActions from '@Actions/toast';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { getFeatureCollection } from '@Services/projectMap';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

export function* applyRouteAnalysisRequest({ payload }) {
  try {
    const response = yield call(optimumRouteAnalysis, payload);
    yield put(
      analysisActions.setAnalysisState({
        analysisTaskId: response.data.task_id,
      }),
    );
  } catch (error) {
    yield put(routeAnalysisActions.applyRouteAnalysisFailure());
    throw error;
  }
}

export function* getRoutePopupDataRequest({ payload: id }) {
  try {
    const response = yield call(getNetworkRoute, id);
    yield put(routeAnalysisActions.getRoutePopupDataSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.getRoutePopupDataFailure());
    throw error;
  }
}

export function* getAnalysisDataRequest({ params }) {
  try {
    const response = yield call(getNetworkRouteCollection, params);
    yield put(routeAnalysisActions.getAnalysisDataSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.getAnalysisDataFailure());
    throw error;
  }
}

export function* saveRouteLayerRequest({ payload }) {
  try {
    const response = yield call(saveRouteLayer, payload);
    const responseData = response.data;
    yield put(
      routeAnalysisActions.saveRouteLayerSuccess({
        ...responseData,
        analysisId: payload.analysis,
      }),
    );
    yield put(commonActions.togglePromptDialog());
    const { layers } = yield select(state => state.analysis);
    const { theme, layer } = responseData;
    yield put(
      analysisActions.setAnalysisState({
        layers: {
          ...layers,
          [theme]: [
            {
              ...responseData,
              checked: true,
              layer_type: 'Vector',
              id: layer,
              style: { ...defaultStyles, geometryType: responseData.geom_type },
            },
            ...layers[theme],
          ],
        },
        zoomToLayerId: layer,
      }),
    );
  } catch (error) {
    yield put(routeAnalysisActions.saveRouteLayerFailure());
    throw error;
  }
}

export function* getSelectedLayerFeatureRequest() {
  try {
    const { attributeList } = yield select(
      state => state.analysis.layerAttributesList,
    );
    const selectedFeature = attributeList.find(item => item.checked);
    const response = yield call(getFeatureCollection, selectedFeature.id);
    yield put(
      routeAnalysisActions.getSelectedLayerFeatureSuccess(response.data),
    );
    yield put(commonActions.toggleModal());
  } catch (error) {
    yield put(routeAnalysisActions.getSelectedLayerFeatureFailure());
    throw error;
  }
}

export function* downloadOptimumRouteAnalysisRequest({ params }) {
  try {
    const response = yield call(downloadOptimumRouteAnalysis, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'OptimumRouteAnalysis.zip';
    link.click();
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));
    yield put(toastActions.success({ message: 'Export Completed.' }));
  } catch (error) {
    yield put(routeAnalysisActions.downloadDocumentFailure());
    throw error;
  }
}

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyRouteAnalysisRequest)),
  );
  yield takeLatest(
    Types.GET_ROUTE_POPUP_DATA_REQUEST,
    withLoader(withErrorHandler(getRoutePopupDataRequest)),
  );
  yield takeLatest(
    Types.GET_ANALYSIS_DATA_REQUEST,
    withLoader(withErrorHandler(getAnalysisDataRequest)),
  );
  yield takeLatest(
    Types.SAVE_ROUTE_LAYER_REQUEST,
    withLoader(withErrorHandler(saveRouteLayerRequest)),
  );
  yield takeLatest(
    Types.GET_SELECTED_LAYER_FEATURE_REQUEST,
    withLoader(withErrorHandler(getSelectedLayerFeatureRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_OPTIMUM_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(downloadOptimumRouteAnalysisRequest)),
  );
}

export default routeAnalysisWatcher;
