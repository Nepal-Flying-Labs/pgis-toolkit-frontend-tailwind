import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators } from '@Actions/projectDashboard';
import ProjectInfo from './ProjectInfo/index';
import LocationInfo from './LocationInfo/index';

const { getProjectInfoRequest, getContactPersonInfoRequest } = Creators;

export default function Info() {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectInfoRequest(projectId));
    dispatch(getContactPersonInfoRequest({ project: projectId }));
  }, [dispatch, projectId]);
  return (
    <div className="naxatw-h-[93vh] naxatw-bg-[#F5F5F5] naxatw-flex naxatw-gap-x-5 naxatw-py-3 naxatw-px-10 naxatw-flex-col md:naxatw-flex-row">
      <ProjectInfo />
      <LocationInfo />
    </div>
  );
}
