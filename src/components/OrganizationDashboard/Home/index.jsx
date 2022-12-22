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
    if (!users) dispatch(getUsersRequest({ organization: organizationId }));
  }, [dispatch, organizationId, users]);
  return (
    <div className="naxatw-h-[93vh] naxatw-bg-[#F5F5F5]   naxatw-flex naxatw-gap-x-5 naxatw-py-3 naxatw-px-10">
      <OrganizationInfo />
      <UserInfo />
    </div>
  );
}
