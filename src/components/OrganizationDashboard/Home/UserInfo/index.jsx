/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import UserIcon from '@Assets/images/user-icon.png';
import Button from '@Components/common/Button/index';
import Searchbar from '@Components/common/Searchbar/index';
import Select from '@Components/common/Select/index';
import UserCard from '../UserCard/index';

const roles = [
  {
    id: 1,
    value: '1',
    name: 'Project Manager',
  },
  {
    id: 2,
    value: '2',
    name: 'Organization Admin',
  },
];

const UserInfo = () => {
  const [searchTerm, setSearchTErm] = useState('');
  const [userRole, setUserRole] = useState('');
  const { organizationId } = useParams();
  const history = useHistory();
  const users = useSelector(state => state.organizationDashboard.users);
  return (
    <div className="naxatw-h-[calc(100vh-5rem)] md:naxatw-w-1/3 md:naxatw-min-w-[400px] naxatw-w-full naxatw-bg-white naxatw-rounded-xl naxatw-border naxatw-border-[#D7D7D7]">
      <div className="naxatw-flex naxatw-p-2 naxatw-justify-between naxatw-items-center naxatw-border-b-[1px] naxatw-rounded-t-xl naxatw-pl-4">
        <div>
          <div className="naxatw-flex naxatw-gap-x-5">
            <img
              src={UserIcon}
              alt="user-icon"
              className="naxatw-h-[60px] naxatw-w-[60px] naxatw-rounded-full"
            />

            <div>
              <h5>Users</h5>
              <h3>{users?.length || 'N/A'}</h3>
            </div>
          </div>
        </div>
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          iconRight="chevron_right"
          onClick={() => history.push(`/organizations/${organizationId}/user`)}
        >
          View all
        </Button>
      </div>
      <div className="naxatw-overflow-y-auto naxatw-overflow-x-hidden scrollbar naxatw-h-[calc(100vh-10.25rem)]">
        <div className="naxatw-py-3 naxatw-px-5 naxatw-flex naxatw-items-center naxatw-gap-x-2">
          <Searchbar
            isSmall
            className="md:naxatw-w-[220px] sm:naxatw-w-[400px] naxatw-w-full naxatw-bg-grey-100"
            value={searchTerm}
            onChange={e => setSearchTErm(e.target.value)}
          />
          <Select
            options={roles}
            className="naxatw-h-[40px] naxatw-pl-3 naxatw-pr-2 naxatw-w-fit"
            placeholder="Role"
            selected={userRole}
            onChange={data => setUserRole(data.name)}
          />
        </div>
        <div>
          {users
            .filter(user =>
              user?.full_name
                ?.toLowerCase()
                ?.includes(searchTerm.toLowerCase()),
            )
            .filter(user =>
              user?.group?.toLowerCase()?.includes(userRole?.toLowerCase()),
            )
            .map(
              ({ full_name, image_thumbnail, group, active, user_id }, i) => (
                <UserCard
                  key={i}
                  id={user_id}
                  name={full_name}
                  image={image_thumbnail}
                  role={group}
                  active={active}
                />
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
