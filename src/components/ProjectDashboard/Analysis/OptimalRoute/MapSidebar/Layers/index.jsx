import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import LayerSection from '@Components/ProjectDashboard/Map/MapSidebar/LayerSection/index';
import { isEmpty } from '@Utils/commonUtils';

const {
  getProjectThemesRequest,
  getProjectThemeLayersRequest,
  getProjectGeojsonRequest,
} = ProjectMapCreators;

export default function Layers() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const dispatch = useDispatch();
  // project map section
  useEffect(() => {
    if (!projectDetail) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
    dispatch(getProjectGeojsonRequest({ project: projectId }));
  }, [dispatch, projectId, projectDetail]);

  useEffect(() => {
    if (isEmpty(themes)) return;
    themes.forEach(({ id }) => {
      dispatch(getProjectThemeLayersRequest({ theme: id }));
    });
  }, [dispatch, themes]);

  return <LayerSection />;
}
