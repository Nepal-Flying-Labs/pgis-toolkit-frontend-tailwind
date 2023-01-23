import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { isEmpty } from '@Utils/commonUtils';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { resetRouteAnalysisState } = RouteAnalysisCreators;

const {
  getProjectThemesRequest,
  getProjectThemeLayersRequest,
  getProjectGeojsonRequest,
} = ProjectMapCreators;

export default function OptimalRoute() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const dispatch = useDispatch();

  // reset route analysis state on unmount
  useEffect(
    () => () => {
      dispatch(resetRouteAnalysisState());
    },
    [dispatch],
  );

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
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
