/* eslint-disable arrow-body-style */
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import { Creators } from '@Actions/organizationDashboard';
import { useParams, useHistory } from 'react-router';

const { toggleModal } = Creators;

const CreateProjectSuccess = () => {
  const dispatch = useDispatch();
  const { organizationId } = useParams();
  const history = useHistory();
  return (
    <div>
      <div className="naxatw-py-7">
        <div className="naxatw-flex naxatw-gap-x-5 naxatw-items-center">
          <span className="naxatw-h-[48px] naxatw-w-[48px] naxatw-bg-[#DFF2F1] naxatw-rounded-full naxatw-flex naxatw-items-center naxatw-justify-center">
            <i className="material-icons naxatw-text-[32px] naxatw-text-[#00A699]">
              check
            </i>
          </span>
          <h4>Project Successfully Created</h4>
        </div>
        <div className="naxatw-mt-7">
          <span className="naxatw-text-body-lg">
          Congratulations on creating your project. You can now add Data, Documents, and Images to this project.
          </span>
        </div>
      </div>
      <div className="naxatw-mt-7 naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary naxatw-mt-2 naxatw-w-[5rem]"
          //   isLoading={loading}
          //   loaderClassName="naxatw-fill-secondary-400"
          onClick={() => {
            dispatch(toggleModal(''));
            history.push(`/organizations/${organizationId}/projects`);
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectSuccess;
