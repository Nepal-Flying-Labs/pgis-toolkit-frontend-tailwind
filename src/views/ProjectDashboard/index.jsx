import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
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

const { getProjectThemesRequest } = Creators;

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, projectId]);

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
