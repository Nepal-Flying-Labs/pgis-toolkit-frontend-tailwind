import React from 'react';
import UserInfo from './UserInfo/index';
import OrganizationInfo from './OrganizationInfo/index';

export default function Home() {
  return (
    <div className="naxatw-h-[93vh] naxatw-bg-[#F5F5F5]   naxatw-flex naxatw-gap-x-5 naxatw-py-3 naxatw-px-10">
      <OrganizationInfo />
      <UserInfo />
    </div>
  );
}
