import React from 'react';
import { useSelector } from 'react-redux';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

export default function OptimalRoute() {
  const roadNetworkLayer = useSelector(
    state => state.routeAnalysis.roadNetworkLayer,
  );
  const obstaclesLayers = useSelector(
    state => state.routeAnalysis.obstaclesLayers,
  );

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
