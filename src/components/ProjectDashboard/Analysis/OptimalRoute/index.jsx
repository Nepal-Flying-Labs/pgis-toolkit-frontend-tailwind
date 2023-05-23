import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { resetRouteAnalysisState } = RouteAnalysisCreators;

export default function OptimalRoute() {
  const dispatch = useDispatch();

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
