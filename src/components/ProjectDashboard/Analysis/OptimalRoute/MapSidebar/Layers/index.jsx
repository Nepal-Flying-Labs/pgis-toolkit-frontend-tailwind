import React from 'react';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import LayerSection from '@Components/ProjectDashboard/Map/MapSidebar/LayerSection/index';
import { isEmpty } from '@Utils/commonUtils';

const {
  getProjectThemesRequest,
  getProjectThemeLayersRequest,
  getProjectGeojsonRequest,
} = ProjectMapCreators;

export default function Layers() {
  return <LayerSection />;
}
