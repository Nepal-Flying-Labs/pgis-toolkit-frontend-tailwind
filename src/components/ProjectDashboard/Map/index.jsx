import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { isEmpty } from '@Utils/commonUtils';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';
import MapExportSidebar from './MapExportSection/MapExportSidebar';
import MapExport from './MapExportSection/MapExport';

const {
  getProjectThemesRequest,
  getProjectThemeLayersRequest,
  getProjectGeojsonRequest,
} = ProjectMapCreators;

export default function Map() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const toggleMapExport = useSelector(
    state => state.projectMap.toggleMapExport,
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

  return (
    <div
      className="naxatw-flex"
      style={{ height: `calc(100vh - ${projectHeaderHeight}px)` }}
    >
      {toggleMapExport ? (
        <>
          <MapExportSidebar />
          <MapExport />
        </>
      ) : (
        <>
          <MapSidebar />
          <MapSection />
        </>
      )}
    </div>
  );
}
