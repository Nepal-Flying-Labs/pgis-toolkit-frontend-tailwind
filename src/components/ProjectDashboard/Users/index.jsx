/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
// import Button from '@Components/common/Button/index';
import { Creators } from '@Actions/projectDashboard';
// import { Creators as CommonCreators } from '@Actions/common';
import UserList from '@Components/ProjectDashboard/Users/UserList';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

const { getUsersRequest } = Creators;

// const { toggleModal } = CommonCreators; getUserGroupRequest

const User = () => {
  const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState('users');
  const handleTabChange = name => {
    setActive(name);
  };

  useEffect(() => {
    dispatch(
      getUsersRequest({ project: projectId, organization: organizationId }),
    );
    // dispatch(
    //   getUserGroupRequest({ project: projectId, organization: organizationId }),
    // );
  }, [dispatch, organizationId, projectId]);

  return (
    <div className="naxatw-mx-10">
      <div className="naxatw-flex naxatw-justify-between naxatw-py-5 ">
        <h3>Users</h3>
        {/* <Button
          onClick={() => dispatch(toggleModal('create-new-user'))}
          iconLeft="add"
          className=" naxatw-btn-secondary naxatw-group"
        >
          <span className=" naxatw-text-[13px] naxatw-leading-[18px] naxatw-text-[#00A699] naxatw-font-bold group-hover:naxatw-underline">
            Create New
          </span>
        </Button> */}
      </div>
      <div className=" naxatw-block naxatw-border-b">
        <ul className="naxatw-flex naxatw-gap-x-2 ">
          <li className="">
            {' '}
            <a
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
          {/* <li className="">
            {' '}
            <a
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${
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

export default User;
