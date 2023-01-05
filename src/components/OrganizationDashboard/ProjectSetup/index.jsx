/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { Creators, Types } from '@Actions/organizationDashboard';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner/index';
import BasicInfo from './FormPages/BasicInfo';
import Location from './FormPages/Location';
// import Documents from './FormPages/Documents';
// import Images from './FormPages/Images';

const {
  getIndividualProjectRequest,
  getContactPersonRequest,
  getCountryListRequest,
} = Creators;

const getPage = (page, setPage) => {
  switch (page) {
    case 1:
      return <BasicInfo setPage={setPage} />;
    case 2:
      return <Location page={page} setPage={setPage} />;
    // case 3:
    //   return <Documents page={page} setPage={setPage} />;
    // case 4:
    //   return <Images page={page} setPage={setPage} />;
    default:
      return '';
  }
};

const pageStatus = [
  {
    id: 1,
    value: 1,
    text: 'Basic Info',
  },
  {
    id: 2,
    value: 2,
    text: 'Location',
  },
  // {
  //   id: 3,
  //   value: 3,
  //   text: 'Documents',
  // },
  // {
  //   id: 4,
  //   value: 4,
  //   text: 'Images',
  // },
];

const ProjectSetup = () => {
  const { projectId, tabname } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);

  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_INDIVIDUAL_PROJECT_REQUEST,
      Types.GET_CONTACT_PERSON_REQUEST,
    ]),
  );

  useEffect(() => {
    dispatch(getIndividualProjectRequest(projectId));
    dispatch(getContactPersonRequest({ project: projectId }));
    dispatch(getCountryListRequest());
  }, [dispatch, projectId]);

  return (
    <div>
      <div className="naxatw-w-full naxatw-h-[6.625rem] naxatw-flex naxatw-justify-center naxatw-sticky naxatw-top-0 naxatw-z-10 naxatw-bg-white naxatw-shadow-md">
        <div className="naxatw-flex naxatw-justify-between naxatw-w-[41.875rem] naxatw-items-center">
          <div>
            <h3>
              {tabname === 'project-setup'
                ? 'Complete your project profile'
                : 'Edit a Project'}
            </h3>
            <span className="naxatw-text-body-lg naxatw-mt-1">
              The functions works in 2 steps as highlighted below.
            </span>
          </div>
          <button
            type="button"
            onClick={() => history.goBack()}
            className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
          >
            <i className="material-icons">close</i>
            <span className="naxatw-sr-only">Close modal</span>
          </button>
        </div>
      </div>
      <div className="naxatw-w-[41.875rem] naxatw-mx-auto ">
        <div className=" naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-px-[5.313rem] naxatw-py-5">
          <div className="naxatw-flex ">
            {pageStatus.map(pg => (
              <div
                key={pg.id}
                className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-relative naxatw-w-[6.25rem] naxatw-h-[4.375rem]"
              >
                {pg.value < page ? (
                  <div
                    className={`${
                      page === pg.value
                        ? 'naxatw-text-primary-400 naxatw-border-primary-400'
                        : 'naxatw-text-[#757575]'
                    } naxatw-h-10 naxatw-mb-2 naxatw-w-10 naxatw-rounded-full naxatw-bg-primary-400 naxatw-border-[1px] naxatw-flex naxatw-justify-center naxatw-items-center`}
                  >
                    <MaterialIcon name="check" className="naxatw-text-white" />
                  </div>
                ) : (
                  <div
                    className={`${
                      page === pg.value
                        ? 'naxatw-text-primary-400 naxatw-border-primary-400'
                        : 'naxatw-text-[#757575]'
                    } naxatw-h-10 naxatw-mb-2 naxatw-w-10 naxatw-rounded-full naxatw-border-[1px] naxatw-flex naxatw-justify-center naxatw-items-center`}
                  >
                    {pg.value}
                  </div>
                )}
                <span
                  className={`naxatw-text-body-md ${
                    page === pg.value
                      ? 'naxatw-text-primary-400 naxatw-font-bold'
                      : 'naxatw-text-[#757575]'
                  } naxatw-text-[0.938rem]`}
                >
                  {pg.text}
                </span>
                {pageStatus.length !== pg.value && (
                  <div className="naxatw-h-[1px] naxatw-w-[3.75rem] naxatw-bg-[#D7D7D7] naxatw-absolute naxatw-top-5 naxatw-left-[70px]" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {!loading ? (
            <div className="naxatw-space-y-7">{getPage(page, setPage)}</div>
          ) : (
            <div className="naxatw-w-full naxatw-h-[calc(100vh-10rem)] naxatw-flex naxatw-items-center naxatw-justify-center">
              <Spinner className="!naxatw-w-[50px] !naxatw-h-[50px] naxatw-fill-secondary-400 " />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSetup;
