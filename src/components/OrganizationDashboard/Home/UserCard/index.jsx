/* eslint-disable arrow-body-style */
import React from 'react';
import DropdownOptions from '@Components/common/DropdownOptions/index';
import Status from '@Components/common/Status/index';
import AvatarImage from '@Assets/images/user-avatar.png';

const UserCard = () => {
  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: () => {},
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: () => {},
    },
  ];
  return (
    <div className="naxatw-p-2 hover:naxatw-bg-[#F5F5F5] hover:naxatw-cursor-pointer naxatw-flex naxatw-justify-between naxatw-gap-x-3">
      <div className="naxatw-flex naxatw-gap-x-3 naxatw-pl-3">
        <img
          src={AvatarImage}
          alt="user-img"
          className="naxatw-w-10 naxatw-h-10 naxatw-rounded-full"
        />
        <div>
          <p className="naxatw-text-body-btn">Annette Black</p>
          <div className="naxatw-flex naxatw-gap-x-2">
            <span className="naxatw-text-body-lg">Project manager</span>
            <Status status="active" />
          </div>
        </div>
      </div>
      <DropdownOptions options={dropdownOptions} stopPropagation />
    </div>
  );
};

export default UserCard;
