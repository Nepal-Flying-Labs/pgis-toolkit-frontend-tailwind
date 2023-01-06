/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@Components/common/Button/index';
import { Creators as OrganizationDashboardCreators } from '@Actions/organizationDashboard';
// import { Creators as CommonCreators } from '@Actions/common';
import Users from '@Components/OrganizationDashboard/User/Users';
import AssignUsers from '@Components/OrganizationDashboard/User/AssignUsers';
import { useParams } from 'react-router';

const { clearUsersFilter, getUserGroupRequest, handleUserTabChange } =
  OrganizationDashboardCreators;
// const { toggleModal } = CommonCreators;

const User = () => {
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.organizationDashboard.userTab);

  useEffect(() => {
    dispatch(getUserGroupRequest({ organization: organizationId }));
    return () => {
      dispatch(clearUsersFilter());
    };
  }, [dispatch, organizationId]);
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
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-body-btn ${
                activeTab === 'users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => dispatch(handleUserTabChange('users'))}
            >
              Users
            </a>
          </li>
          <li className="">
            {' '}
            <a
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-body-btn ${
                activeTab === 'assign-users'
                  ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                  : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
              }`}
              onClick={() => dispatch(handleUserTabChange('assign-users'))}
            >
              Assign Users
            </a>
          </li>
        </ul>
      </div>
      {activeTab === 'users' && <Users />}
      {activeTab === 'assign-users' && <AssignUsers />}
    </div>
  );
};

export default User;
