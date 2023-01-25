/* eslint-disable no-nested-ternary */
import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  delay,
  select,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import chroma from 'chroma-js';
import commonActions from '@Actions/common';
import analysisActions, { Types } from '@Actions/analysis';
import bufferAnalysisActions from '@Actions/bufferAnalysis';
import routeAnalysisActions from '@Actions/routeAnalysis';
import toastActions from '@Actions/toast';
import {
  getAnalysisLayer,
  getAnalysisTaskResponse,
} from '@Services/routeAnalysis';
import {
  getProjectThemeLayers,
  getProjectThemes,
  updateLayer,
} from '@Services/projectMap';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { isEmpty } from '@Utils/commonUtils';
import {
  defaultStyles,
  pointTypes,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import prepareFormData from '@Utils/prepareFormData';

export function* copyLayerDataRequest({ payload }) {
  try {
    const { analysisType, organizationId, projectId } = payload;
    yield put(commonActions.toggleModal());
    // copy layers to analysis reducer state
    const { themes, layers } = yield select(state => state.projectMap);
    yield put(
      analysisActions.setAnalysisState({
        layers: Object.entries(layers).reduce(
          (obj, [key, val]) => ({
            ...obj,
            [key]: val.map(item => ({ ...item, checked: false })),
          }),
          {},
        ),
        themes,
      }),
    );
    if (analysisType === 'buffer-analysis') {
      yield put(
        push(
          `/organizations/${organizationId}/projects/${projectId}/analysis/${analysisType}`,
        ),
      );
    } else {
      yield put(
        push(
          `/organizations/${organizationId}/projects/${projectId}/data-cleaning/${analysisType}`,
        ),
      );
    }
  } catch (error) {
    yield put(analysisActions.copyLayerDataFailure());
    throw error;
  }
}

export function* checkProcessingStatusRequest({ payload }) {
  const { projectId, taskId, analysisType } = payload;
  const action =
    analysisType === 'buffer-analysis'
      ? bufferAnalysisActions
      : analysisType === 'optimal-route'
      ? routeAnalysisActions
      : analysisActions;

  try {
    let responseData = { status: 'processing' };
    while (responseData?.status === 'processing') {
      yield delay(5 * 1000); // call api in 5 second interval
      const response = yield call(getAnalysisTaskResponse, { task_id: taskId });
      responseData = response.data;
    }
    if (responseData.status === 'route_not_found') {
      yield put(toastActions.error({ message: 'Route not found!' }));
      return;
    }
    if (responseData.status === 'success') {
      const params = {
        project: projectId,
        analysis_id: responseData.analysis_id,
      };
      const analysisResponse = yield call(getAnalysisLayer, params);
      yield put(action.checkProcessingStatusSuccess(analysisResponse.data));
    }
  } catch (error) {
    yield put(action.checkProcessingStatusFailure());
    throw error;
  }
}

export function* getProjectThemesRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(analysisActions.getProjectThemesSuccess(response.data));
  } catch (error) {
    yield put(analysisActions.getProjectThemesFailure());
    throw error;
  }
}

export function* getProjectThemeLayersRequest({ params }) {
  try {
    const response = yield call(getProjectThemeLayers, params);
    const layersWithNoStyle = response.data.filter(item =>
      isEmpty(item.style || {}),
    );
    const payloadData = layersWithNoStyle.map(item => ({
      id: item.id,
      style: {
        ...defaultStyles,
        fillColor: chroma.random().hex(),
        fillOpacity: pointTypes.includes(item.geom_type)
          ? 100
          : defaultStyles.fillOpacity,
      },
    }));
    yield all(
      payloadData.map(item =>
        call(updateLayer, item.id, prepareFormData({ style: item.style })),
      ),
    );
    const data = response.data.map(item =>
      item.style
        ? { ...item }
        : { ...item, style: payloadData.find(i => i.id === item.id)?.style },
    );
    yield put(
      analysisActions.getProjectThemeLayersSuccess({
        data,
        theme: params.theme,
      }),
    );
  } catch (error) {
    yield put(analysisActions.getProjectThemeLayersFailure());
    throw error;
  }
}

function* analysisWatcher() {
  yield takeLatest(
    Types.COPY_LAYER_DATA_REQUEST,
    withLoader(withErrorHandler(copyLayerDataRequest)),
  );
  yield takeLatest(
    Types.CHECK_PROCESSING_STATUS_REQUEST,
    withLoader(withErrorHandler(checkProcessingStatusRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_THEMES_REQUEST,
    withLoader(withErrorHandler(getProjectThemesRequest)),
  );
  yield takeEvery(
    Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    withLoader(withErrorHandler(getProjectThemeLayersRequest)),
  );
}

export default analysisWatcher;
