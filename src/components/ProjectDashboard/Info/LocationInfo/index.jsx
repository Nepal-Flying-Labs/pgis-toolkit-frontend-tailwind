/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import UserIcon from '@Assets/images/user-icon.png';
import Button from '@Components/common/Button/index';
import Searchbar from '@Components/common/Searchbar/index';
import Select from '@Components/common/Select/index';
import MapCard from './MapCard/index';

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
  {
    id: 3,
    value: '3',
    name: 'Medical Assistant',
  },
];

const LocationInfo = () => {
  const { organizationId } = useParams();
  const history = useHistory();
  const users = useSelector(state => state.organizationDashboard.users);
  return (
    <div className="naxatw-w-[440px] naxatw-bg-white naxatw-rounded-[20px] naxatw-border naxatw-border-[#D7D7D7]">
      <div className="naxatw-flex naxatw-py-3 naxatw-px-4 naxatw-justify-between naxatw-items-center naxatw-border-b-[1px] naxatw-rounded-t-xl naxatw-pl-4">
        <div className="naxatw-flex naxatw-gap-x-5">
          <img
            src={UserIcon}
            alt="user-icon"
            className="naxatw-h-[60px] naxatw-w-[60px] naxatw-rounded-full"
          />

          <div>
            <h3>Location</h3>
            <p className="naxatw-text-body-lg">
              23 Saint Street, Columbia, North America
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ height: `calc(100vh - 185px)` }}
        className="naxatw-overflow-hidden"
      >
        <MapCard />
      </div>
    </div>
  );
};

export default LocationInfo;
