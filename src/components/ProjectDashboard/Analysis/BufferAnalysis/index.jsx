import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Creators } from '@Actions/routeAnalysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

// const { resetRouteAnalysisState } = Creators;

export default function OptimalRoute() {
  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
