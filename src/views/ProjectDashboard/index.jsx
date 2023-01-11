/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import ManageDataCollection from '@Components/ProjectDashboard/ManageDataCollection/index';
import ProjectHeader from '@Components/common/ProjectHeader';
import Map from '@Components/ProjectDashboard/Map';
import Data from '@Components/ProjectDashboard/Data';
import Document from '@Components/ProjectDashboard/Document';
import Gallery from '@Components/ProjectDashboard/Gallery';
import Users from '@Components/ProjectDashboard/Users';
import Info from '@Components/ProjectDashboard/Info';
import Settings from '@Components/ProjectDashboard/Settings';
import AppLoader from '@Components/common/AppLoader';
import Analysis from '@Components/ProjectDashboard/Analysis';

const {
  getProjectLayersRequest,
  getProjectDetailRequest,
  resetProjectDashboardState,
} = ProjectDashboardCreators;

function getTabContent(tabname) {
  switch (tabname) {
    case 'map':
      return <Map />;
    case 'data':
      return <Data />;
    case 'document':
      return <Document />;
    case 'gallery':
      return <Gallery />;
    case 'users':
      return <Users />;
    case 'info':
      return <Info />;
    case 'settings':
      return <Settings />;
    default:
      return <Map />;
  }
}

export default function ProjectDashboard() {
  const { tabname, projectId, organizationId } = useParams();
  const history = useHistory();
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const layers = useSelector(state => state.projectDashboard.data.layers);
  const pushedToManageDataPage = useRef(false);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetProjectDashboardState());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getProjectDetailRequest({ project: projectId }));
    dispatch(getProjectLayersRequest({ project: projectId }));
  }, [dispatch, projectId]);

  if (!layers) {
    return <AppLoader />;
  }

  if (layers && layers.length < 2 && !pushedToManageDataPage.current) {
    pushedToManageDataPage.current = true;
    history.push(
      `/organizations/${organizationId}/projects/${projectId}/manage-data`,
    );
  }

  return tabname === 'manage-data' ? (
    <ManageDataCollection />
  ) : tabname === 'analysis' || tabname === 'data-cleaning' ? (
    <Analysis />
  ) : (
    <div>
      <ProjectHeader />
      <div
        style={{
          marginTop: projectHeaderHeight,
        }}
      >
        {getTabContent(tabname)}
      </div>
    </div>
  );
}
