/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
// import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import LocationIcon from '@Assets/images/info-location.png';
import Creators from '@Actions/projectDashboard';
import { isEmpty } from '@Utils/commonUtils';
import MapCard from './MapCard/index';

const LocationInfo = () => {
  // const { organizationId, projectId } = useParams();
  // const history = useHistory();
  // const users = useSelector(state => state.organizationDashboard.users);
  const info = useSelector(state => state.projectDashboard.info.details);
  const locationState = useSelector(
    state => state.projectDashboard.info.location.state,
  );
  const locationCountry = useSelector(
    state => state.projectDashboard.info.location.country,
  );

  const dispatch = useDispatch();

  const { getProjectCountryRequest, getProjectStateRequest } = Creators;
  // console.log('project info', info);
  useEffect(() => {
    if (!isEmpty(info)) {
      if (info.country) {
        dispatch(getProjectCountryRequest({ id: info.country[0] }));
        dispatch(getProjectStateRequest({ project: info.country[0] }));
      }
    }
  }, [dispatch, info]);

  return (
    <div className="naxatw-w-1/3 naxatw-min-w-[440px] naxatw-bg-white naxatw-rounded-[20px] naxatw-border naxatw-overflow-hidden naxatw-border-grey-300">
      <div className="naxatw-flex naxatw-py-3 naxatw-px-4 naxatw-justify-between naxatw-items-center naxatw-border-b-[1px] naxatw-rounded-t-xl naxatw-pl-4">
        <div className="naxatw-flex naxatw-gap-x-5">
          <img
            src={LocationIcon}
            alt="user-icon"
            className="naxatw-h-[60px] naxatw-w-[60px] naxatw-rounded-full"
          />

          <div>
            <h3>Location</h3>
            <p className="naxatw-text-body-lg">
              {!isEmpty(locationState)
                ? locationState.map(d => (
                    <span key={d.id} className="naxatw-text-body-lg">
                      {d.name} <span>, </span>
                    </span>
                  ))
                : '-'}
              {!isEmpty(locationCountry)
                ? locationCountry.map((d, index) => (
                    <span key={d.id} className="naxatw-text-body-lg">
                      {d.name}
                      <span
                        className={`${
                          index === locationCountry.length - 1
                            ? 'naxatw-hidden'
                            : 'naxatw-text-body-lg'
                        }`}
                      >
                        ,{' '}
                      </span>
                    </span>
                  ))
                : '-'}
            </p>
          </div>
        </div>
      </div>

      <div
        // style={{ height: `calc(100vh - 115px)` }}
        className=""
      >
        <MapCard />
      </div>
    </div>
  );
};

export default LocationInfo;
