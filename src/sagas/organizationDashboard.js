/* eslint-disable no-nested-ternary */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  getProjects,
  postProjectInvite,
  getIndividualProject,
  getOrganizationDetail,
  patchProject,
  getContactPerson,
  postContactPerson,
  patchContactPerson,
  getCountryList,
} from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withLoader } from '@Utils/sagaUtils';

export function* getOrganizationDetailRequest({ id }) {
  try {
    const response = yield call(getOrganizationDetail, id);
    yield put(
      organizationDashboardActions.getOrganizationDetailSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getOrganizationDetailFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getProjectsRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getProjectsSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getProjectsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* postProjectInviteRequest({ payload }) {
  const { organization } = payload;
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(organizationDashboardActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Invitation sent success' }));
    yield put(
      organizationDashboardActions.getProjectsRequest({ organization }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getIndividualProjectRequest({ id }) {
  try {
    const response = yield call(getIndividualProject, id);
    yield put(
      organizationDashboardActions.getIndividualProjectSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getIndividualProjectFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* patchProjectRequest({ id, payload }) {
  const { status, organization } = payload;
  console.log(payload, 'payload');
  try {
    let filteredImagePayload;
    if (payload?.cover_image) {
      filteredImagePayload = {
        ...payload,
        cover_image:
          payload?.cover_image && payload.cover_image.length > 0
            ? payload?.cover_image?.filter(img => !img.isDeleted && img.file)
                .length > 0
              ? payload?.cover_image?.filter(
                  img => !img.isDeleted && img.file,
                )?.[0]?.file
              : ''
            : '',
      };
    } else {
      filteredImagePayload = {
        ...payload,
      };
    }

    console.log(status, 'status');
    const formData = prepareFormData(filteredImagePayload);
    const response = yield call(patchProject, id, formData);
    yield put(organizationDashboardActions.patchProjectSuccess(response.data));
    yield put(organizationDashboardActions.toggleModal(''));
    if (status === 'ongoing') {
      yield put(
        organizationDashboardActions.toggleModal('create-project-success'),
      );
    } else {
      yield put(commonActions.togglePromptDialog(''));
      yield put(push(`/organizations/${organization}/projects`));
    }
    yield put(toastActions.success({ message: 'Data saved successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.patchProjectFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getContactPersonRequest({ params }) {
  try {
    const response = yield call(getContactPerson, params);
    yield put(
      organizationDashboardActions.getContactPersonSuccess({
        data: response.data,
      }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getContactPersonFailure());
  }
}

export function* postContactPersonRequest({ params, payload }) {
  try {
    console.log(payload);
    const formData = prepareFormData(payload);
    const response = yield call(postContactPerson, formData, params);
    yield put(
      organizationDashboardActions.postContactPersonSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postContactPersonFailure());
  }
}
export function* patchContactPersonRequest({ params, id }) {
  try {
    const response = yield call(patchContactPerson, id, params);
    yield put(
      organizationDashboardActions.patchContactPersonSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.patchContactPersonFailure());
  }
}

export function* getCountryListRequest() {
  try {
    const response = yield call(getCountryList);
    yield put(
      organizationDashboardActions.getCountryListSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getCountryListFailure());
  }
}

function* organizationDashboardWatcher() {
  yield takeLatest(
    Types.GET_ORGANIZATION_DETAIL_REQUEST,
    withLoader(getOrganizationDetailRequest),
  );
  yield takeLatest(Types.GET_PROJECTS_REQUEST, withLoader(getProjectsRequest));
  yield takeLatest(
    Types.POST_PROJECT_INVITE_REQUEST,
    withLoader(postProjectInviteRequest),
  );
  yield takeLatest(
    Types.GET_INDIVIDUAL_PROJECT_REQUEST,
    withLoader(getIndividualProjectRequest),
  );
  yield takeLatest(
    Types.PATCH_PROJECT_REQUEST,
    withLoader(patchProjectRequest),
  );
  yield takeLatest(
    Types.GET_CONTACT_PERSON_REQUEST,
    withLoader(getContactPersonRequest),
  );
  yield takeLatest(
    Types.POST_CONTACT_PERSON_REQUEST,
    withLoader(postContactPersonRequest),
  );
  yield takeLatest(
    Types.PATCH_CONTACT_PERSON_REQUEST,
    withLoader(patchContactPersonRequest),
  );
  yield takeLatest(
    Types.GET_COUNTRY_LIST_REQUEST,
    withLoader(getCountryListRequest),
  );
}

export default organizationDashboardWatcher;
