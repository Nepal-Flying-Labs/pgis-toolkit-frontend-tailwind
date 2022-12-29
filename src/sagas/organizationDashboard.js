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
  getUsers,
  getUserGroup,
} from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* getOrganizationDetailRequest({ id }) {
  try {
    const response = yield call(getOrganizationDetail, id);
    yield put(
      organizationDashboardActions.getOrganizationDetailSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getOrganizationDetailFailure());
    throw error;
  }
}

export function* getProjectsRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getProjectsSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getProjectsFailure());
    throw error;
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
    yield put(commonActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Invitation sent success' }));
    yield put(
      organizationDashboardActions.getProjectsRequest({ organization }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    throw error;
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
    throw error;
  }
}

export function* patchProjectRequest({ id, payload }) {
  const { status, organization, page } = payload;
  const newPayload = payload;
  delete newPayload.page;
  try {
    const formData = prepareFormData(newPayload);
    const response = yield call(patchProject, id, formData);
    yield put(organizationDashboardActions.patchProjectSuccess(response.data));
    // yield put(organizationDashboardActions.toggleModal(''));
    if (!page) {
      yield put(push(`/organizations/${organization}/projects`));
      if (status === 'ongoing') {
        yield put(push(`/organizations/${organization}/projects`));
        yield put(commonActions.toggleModal('create-project-success'));
      } else {
        yield put(commonActions.togglePromptDialog(''));
        yield put(push(`/organizations/${organization}/projects`));
      }
    }

    yield put(toastActions.success({ message: 'Data saved successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.patchProjectFailure());
    throw error;
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
    throw error;
  }
}

export function* postContactPersonRequest({ params, payload }) {
  try {
    const formData = prepareFormData(payload);
    const response = yield call(postContactPerson, formData, params);
    yield put(
      organizationDashboardActions.postContactPersonSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postContactPersonFailure());
    throw error;
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
    throw error;
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
    throw error;
  }
}

export function* getUsersRequest({ params }) {
  try {
    const response = yield call(getUsers, params);
    yield put(organizationDashboardActions.getUsersSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getUsersFailure());
  }
}

export function* getUserGroupRequest({ params }) {
  try {
    const response = yield call(getUserGroup, params);
    yield put(organizationDashboardActions.getUserGroupSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getUserGroupFailure());
  }
}

export function* getAllProjectRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getAllProjectSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getAllProjectFailure());
    throw error;
  }
}

export function* postAssignUserRequest({ payload }) {
  const { organization } = payload;
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(push(`/organizations/${organization}/user`));
    yield put(toastActions.success({ message: 'User assigned successful' }));
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    throw error;
  }
}

function* organizationDashboardWatcher() {
  yield takeLatest(
    Types.GET_ORGANIZATION_DETAIL_REQUEST,
    withLoader(withErrorHandler(getOrganizationDetailRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECTS_REQUEST,
    withLoader(withErrorHandler(getProjectsRequest)),
  );
  yield takeLatest(
    Types.POST_PROJECT_INVITE_REQUEST,
    withLoader(withErrorHandler(postProjectInviteRequest)),
  );
  yield takeLatest(
    Types.GET_INDIVIDUAL_PROJECT_REQUEST,
    withLoader(withErrorHandler(getIndividualProjectRequest)),
  );
  yield takeLatest(
    Types.PATCH_PROJECT_REQUEST,
    withLoader(withErrorHandler(patchProjectRequest)),
  );
  yield takeLatest(
    Types.GET_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(getContactPersonRequest)),
  );
  yield takeLatest(
    Types.POST_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(postContactPersonRequest)),
  );
  yield takeLatest(
    Types.PATCH_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(patchContactPersonRequest)),
  );
  yield takeLatest(
    Types.GET_COUNTRY_LIST_REQUEST,
    withLoader(withErrorHandler(getCountryListRequest)),
  );
  yield takeLatest(Types.GET_USERS_REQUEST, withLoader(getUsersRequest));
  yield takeLatest(
    Types.GET_USER_GROUP_REQUEST,
    withLoader(getUserGroupRequest),
  );
  yield takeLatest(
    Types.GET_ALL_PROJECT_REQUEST,
    withLoader(getAllProjectRequest),
  );
  yield takeLatest(
    Types.POST_ASSIGN_USER_REQUEST,
    withLoader(withErrorHandler(postAssignUserRequest)),
  );
}

export default organizationDashboardWatcher;
