/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Button from '@Components/common/Button/index';
// import { Creators as UserCreators } from '@Actions/users';
// import { Creators as CommonCreators } from '@Actions/common';
// import AssignUsers from '@Components/OrganizationDashboard/User/AssignUsers';
// import { useParams } from 'react-router';
import UserList from '@Components/Users/UserList';

// const { getUsersRequest } = UserCreators;
// const { toggleModal } = CommonCreators;

const UserPanel = () => {
  // const { organizationId } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState('users');
  const handleTabChange = name => {
    setActive(name);
  };

  useEffect(() => {
    // dispatch(getUsersRequest());
  }, [dispatch]);
  return (
    <div className="">
      {/* <div className="naxatw-flex naxatw-justify-between naxatw-py-5 ">
        <h3>Users</h3>
        <Button
          onClick={() => dispatch(toggleModal('create-new-user'))}
          iconLeft="add"
          className=" naxatw-btn-secondary naxatw-group"
        >
          <span className=" naxatw-text-[13px] naxatw-leading-[18px] naxatw-text-[#00A699] naxatw-font-bold group-hover:naxatw-underline">
            Create New
          </span>
        </Button>
      </div> */}
      <div className=" naxatw-block naxatw-border-b">
        <ul className="naxatw-flex naxatw-gap-x-2 ">
          <li className="">
            {' '}
            <a
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-body-btn ${
                active === 'users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => handleTabChange('users')}
            >
              Users
            </a>
          </li>
          {/* <li className="">
            {' '}
            <a
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-body-btn${
                active === 'assign-users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => handleTabChange('assign-users')}
            >
              Assign Users
            </a>
          </li> */}
        </ul>
      </div>
      {active === 'users' && <UserList />}
      {/* {active === 'assign-users' && <AssignUsers />} */}
    </div>
  );
};

export default UserPanel;
