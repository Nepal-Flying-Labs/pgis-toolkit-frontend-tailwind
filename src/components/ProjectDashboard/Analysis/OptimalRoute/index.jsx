import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import { obstacleLayersThemeIdSelector } from '@Selectors/analysis';
import { isEmpty } from '@Utils/commonUtils';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { resetRouteAnalysisState, setRouteAnalysisState } =
  RouteAnalysisCreators;

export default function OptimalRoute() {
  const dispatch = useDispatch();
  const obstacleLayersThemeId = useSelector(obstacleLayersThemeIdSelector);
  const layers = useSelector(state => state.analysis.layers);
  const obstacleLayers = useSelector(
    state => state.routeAnalysis.obstacleLayers,
  );

  // set obstacle layers for existing analysis
  useEffect(() => {
    if (!obstacleLayersThemeId || !layers || !isEmpty(obstacleLayers)) return;
    dispatch(
      setRouteAnalysisState({
        obstacleLayers: layers[obstacleLayersThemeId].map(item => ({
          ...item,
          checked: false,
        })),
      }),
    );
  }, [dispatch, obstacleLayersThemeId, layers, obstacleLayers]);

  // // reset route analysis state on unmount
  // useEffect(
  //   () => () => {
  //     dispatch(resetRouteAnalysisState());
  //   },
  //   [dispatch],
  // );

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
