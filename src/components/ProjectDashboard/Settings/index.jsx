/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import MaterialIcon from '@Components/common/MaterialIcon';
import BasicInfo from '@Components/OrganizationDashboard/ProjectSetup/FormPages/BasicInfo';
import Location from '@Components/OrganizationDashboard/ProjectSetup/FormPages/Location';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner/index';
// import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';

const {
  getIndividualProjectRequest,
  getContactPersonRequest,
  getCountryListRequest,
} = Creators;

const linkOptions = [
  {
    id: 1,
    name: 'Basic Info',
  },
  {
    id: 2,
    name: 'Location',
  },
];

export default function Settings() {
  const { projectId } = useParams();
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_INDIVIDUAL_PROJECT_REQUEST,
      Types.GET_CONTACT_PERSON_REQUEST,
    ]),
  );

  useEffect(() => {
    dispatch(getIndividualProjectRequest(projectId));
    dispatch(getContactPersonRequest({ project: projectId, type: 'project' }));
    dispatch(getCountryListRequest());
  }, [dispatch, projectId]);

  return (
    <div className="naxatw-bg-[#F5F5F5]">
      <div className="naxatw-ml-[40px] naxatw-pt-3 naxatw-flex naxatw-gap-x-5 naxatw-h-[calc(100vh-60px)]">
        <div className="naxatw-pl-[200px]">
          <div className="naxatw-rounded-xl naxatw-border naxatw-py-3 fl md:naxatw-w-[325px] naxatw-bg-white">
            <ul>
              {linkOptions.map(link => (
                <li
                  key={link.id}
                  onClick={() => setActive(link.id)}
                  className={`naxatw-p-4 naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center hover:naxatw-bg-grey-100 naxatw-cursor-pointer  ${
                    active === link.id ? 'naxatw-bg-grey-100' : ''
                  } `}
                >
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
                    <span
                      className={`naxatw-text-[13px] naxatw-font-bold ${
                        active === link.id
                          ? 'naxatw-text-primary-400'
                          : 'naxatw-text-grey-600'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>

                  {active === link.id && (
                    <MaterialIcon
                      name="chevron_right"
                      className="naxatw-text-icon-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" naxatw-overflow-y-auto scrollbar  naxatw-w-full">
          <div className="naxatw-w-[50rem] naxatw-p-7 naxatw-bg-white naxatw-rounded-xl ">
            {!loading ? (
              <>
                {active === 1 && (
                  <div className="naxatw-space-y-7 ">
                    <h3>Basic Info</h3>
                    <BasicInfo />
                  </div>
                )}

                {active === 2 && (
                  <div className="naxatw-space-y-7">
                    <h3>Location</h3>
                    <Location />
                  </div>
                )}
              </>
            ) : (
              <div className="naxatw-h-screen naxatw-flex naxatw-items-center naxatw-justify-center">
                <Spinner className="!naxatw-w-[50px] !naxatw-h-[50px] naxatw-fill-secondary-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
