import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { projectHeaderHeight } from '@src/constants';
import { Creators } from '@Actions/projectDashboard';
import ProjectHeader from '@Components/common/ProjectHeader';
import Map from '@Components/ProjectDashboard/Map';
import Data from '@Components/ProjectDashboard/Data';
import Document from '@Components/ProjectDashboard/Document';
import Gallery from '@Components/ProjectDashboard/Gallery';
import Users from '@Components/ProjectDashboard/Users';
import Info from '@Components/ProjectDashboard/Info';
import Settings from '@Components/ProjectDashboard/Settings';
import { isEmpty } from '@Utils/commonUtils';

const { getProjectThemesRequest, getProjectThemeLayersRequest } = Creators;

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
  const { projectId, tabname } = useParams();
  const themes = useSelector(state => state.projectDashboard.themes);
  const dispatch = useDispatch();

  // project map section
  useEffect(() => {
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (isEmpty(themes)) return;
    themes.forEach(({ id }) => {
      dispatch(getProjectThemeLayersRequest({ theme: id }));
    });
  }, [dispatch, themes]);

  return (
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
