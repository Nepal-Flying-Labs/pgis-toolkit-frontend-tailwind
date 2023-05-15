import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { toggleModal } = CommonCreators;

const { resetRouteAnalysisState } = RouteAnalysisCreators;

export default function OptimalRoute() {
  const { analysisId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!analysisId) {
      dispatch(toggleModal('create-analysis'));
    }
  }, [dispatch, analysisId]);

  // reset route analysis state on unmount
  useEffect(
    () => () => {
      dispatch(resetRouteAnalysisState());
    },
    [dispatch],
  );

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
