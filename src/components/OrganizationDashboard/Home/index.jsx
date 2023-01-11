import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators } from '@Actions/organizationDashboard';
import UserInfo from './UserInfo/index';
import OrganizationInfo from './OrganizationInfo/index';

const { getUsersRequest } = Creators;

export default function Home() {
  const { organizationId } = useParams();
  const users = useSelector(state => state.organizationDashboard.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length < 1)
      dispatch(getUsersRequest({ organization: organizationId }));
  }, [dispatch, organizationId, users]);
  return (
    <div className="naxatw-h-[calc(100vh-10px)] naxatw-bg-grey-100 naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-gap-y-4 naxatw-gap-x-5 naxatw-py-3 naxatw-px-10">
      <OrganizationInfo />
      <UserInfo />
    </div>
  );
}
