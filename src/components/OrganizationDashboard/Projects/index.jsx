import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizationDashboard';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getProjectsCentroidGeojsonRequest } = Creators;

export default function Projects() {
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const centroidGeojson = useSelector(
    state => state.organizationDashboard.centroidGeojson,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  useEffect(() => {
    if (centroidGeojson) return;
    dispatch(
      getProjectsCentroidGeojsonRequest({ organization: organizationId }),
    );
  }, [organizationId, dispatch, centroidGeojson]);

  return (
    <div
      className="naxatw-flex naxatw-w-full"
      style={{
        height: `calc(100vh - ${projectHeaderHeight}px)`,
      }}
    >
      <MapSidebar />

      <MapSection />
    </div>
  );
}
