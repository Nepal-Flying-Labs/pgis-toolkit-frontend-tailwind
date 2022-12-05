/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Button from '@Components/common/Button/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { Creators } from '@Actions/organizationDashboard';
import Modal from '@Components/common/Modal/index';
import useForm from '@Hooks/useForm';
import SaveAsDraft from '../ModalContent/SaveAsDraft';

import BasicInfo from './FormPages/BasicInfo';
import Location from './FormPages/Location';
import Documents from './FormPages/Documents';
import Images from './FormPages/Images';

const {
  getIndividualProjectRequest,
  toggleModal,
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
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const modalContent = useSelector(
    state => state.organizationDashboard.modalContent,
  );

  useEffect(() => {
    dispatch(getIndividualProjectRequest(projectId));
    dispatch(getContactPersonRequest({ project: projectId }));
    dispatch(getCountryListRequest());
  }, [dispatch, projectId]);

  return (
    <>
      <Modal
        show={!!modalContent}
        title=""
        onClose={() => dispatch(toggleModal(''))}
      >
        <SaveAsDraft />
      </Modal>
      <div>
        <div className="naxatw-w-full naxatw-h-[6.625rem] naxatw-flex naxatw-justify-center naxatw-sticky naxatw-top-0 naxatw-z-10 naxatw-bg-white naxatw-shadow-md">
          <div className="naxatw-flex naxatw-justify-between naxatw-w-[41.875rem] naxatw-items-center">
            <div>
              <h3>Create a New Project</h3>
              <span className="naxatw-text-body-lg naxatw-mt-1">
                The functions works in 5 steps as highlighted below.
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
                      <MaterialIcon
                        name="check"
                        className="naxatw-text-white"
                      />
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
            <div className="naxatw-space-y-7">
              {getPage(page, setPage)}
              {/* <div className="naxatw-flex naxatw-justify-between  naxatw-pt-7 naxatw-pb-7 ">
              {page > 1 ? (
                <Button
                  iconLeft="arrow_back"
                  className=" naxatw-w-[8.875rem] naxatw-text-[#00A699] "
                  onClick={() => setPage(prevPage => prevPage - 1)}
                >
                  Go back
                </Button>
              ) : (
                <div />
              )}
              <Button
                className="naxatw-btn-primary naxatw-w-[4.75rem]"
                onClick={() => setPage(prevPage => prevPage + 1)}
              >
                Next
              </Button>
              <Button
                // onClick={handleSubmit}
                className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-border-[1px] hover:naxatw-underline hover:naxatw-bg-grey-200"
              >
                Save as Draft
              </Button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSetup;
