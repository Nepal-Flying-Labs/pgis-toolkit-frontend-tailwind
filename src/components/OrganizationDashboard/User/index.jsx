/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import { Creators } from '@Actions/organizationDashboard';
import Users from '@Components/OrganizationDashboard/User/Users';
import AssignUsers from '@Components/OrganizationDashboard/User/AssignUsers';

const { toggleModal, clearUsersFilter } = Creators;

const User = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('users');
  const handleTabChange = name => {
    setActive(name);
  };

  useEffect(() => {
    return () => {
      dispatch(clearUsersFilter());
    };
  }, []);
  return (
    <div className="naxatw-mx-10">
      <div className="naxatw-flex naxatw-justify-between naxatw-py-5 ">
        <h3>Users</h3>
        <Button
          onClick={() => dispatch(toggleModal('create-new-user'))}
          iconLeft="add"
          className=" naxatw-w-[9.375rem]  naxatw-text-[#00A699] naxatw-border-[1px] group-hover hover:naxatw-bg-grey-200 naxatw-flex naxatw-items-center"
        >
          <span className="hover:naxatw-underline naxatw-text-[13px] naxatw-leading-[18px] naxatw-text-[#00A699] naxatw-font-bold ">
            Create New
          </span>
        </Button>
      </div>
      <div className=" naxatw-block naxatw-border-b">
        <ul className="naxatw-flex naxatw-gap-x-2 ">
          <li className="">
            {' '}
            <a
              href={() => {}}
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${
                active === 'users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => handleTabChange('users')}
            >
              Users
            </a>
          </li>
          <li className="">
            {' '}
            <a
              href={() => {}}
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${
                active === 'assign-users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => handleTabChange('assign-users')}
            >
              Assign Users
            </a>
          </li>
        </ul>
      </div>
      {active === 'users' && <Users />}
      {active === 'assign-users' && <AssignUsers />}
    </div>
  );
};

export default User;
