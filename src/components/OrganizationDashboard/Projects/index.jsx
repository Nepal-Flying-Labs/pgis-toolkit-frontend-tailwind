import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizationDashboard';
import { projectHeaderHeight } from '@src/constants';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getProjectsRequest } = Creators;

export default function Projects() {
  const { organizationId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsRequest({ organization: organizationId }));
  }, [dispatch, organizationId]);

  return (
    <div
      className={`naxatw-h-[calc(100vh-${projectHeaderHeight})] naxatw-flex`}
    >
      <MapSidebar />

      <MapSection />
    </div>
  );
}
