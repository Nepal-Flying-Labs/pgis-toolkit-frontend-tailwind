import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { projectHeaderHeight } from '@src/constants';
import { isEmpty } from '@Utils/commonUtils';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getProjectThemesRequest, getProjectThemeLayersRequest } =
  ProjectMapCreators;

export default function Map() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
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
    <div
      className={`naxatw-h-[calc(100vh-${projectHeaderHeight})] naxatw-flex`}
    >
      <MapSidebar />

      <MapSection />
    </div>
  );
}
