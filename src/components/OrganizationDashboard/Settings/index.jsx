/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner/index';
import BasicInfo from './BasicInfo';
// import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';

const {
  //   getIndividualProjectRequest,
  getContactPersonRequest,
  //   getCountryListRequest,
  getOrganizationByIdRequest,
} = Creators;

export default function Settings() {
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_ORGANIZATION_BY_ID_REQUEST,
      Types.GET_CONTACT_PERSON_REQUEST,
    ]),
  );

  useEffect(() => {
    dispatch(getOrganizationByIdRequest(organizationId));
    dispatch(
      getContactPersonRequest({
        organization: organizationId,
        type: 'organization',
      }),
    );
    // dispatch(getCountryListRequest());
  }, [dispatch, organizationId]);

  return (
    <div className="naxatw-bg-[#F5F5F5]">
      <div className="naxatw-ml-[40px] naxatw-pt-3 naxatw-flex naxatw-gap-x-5 naxatw-h-[calc(100vh-60px)]">
        <div className=" naxatw-overflow-y-auto scrollbar  naxatw-w-full naxatw-flex naxatw-justify-center">
          <div className="naxatw-w-[50rem] naxatw-p-7 naxatw-bg-white naxatw-rounded-xl naxatw-h-fit naxatw-mb-3">
            {!loading ? (
              <div className="naxatw-space-y-7">
                <h3>Settings</h3>
                <BasicInfo />
              </div>
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
