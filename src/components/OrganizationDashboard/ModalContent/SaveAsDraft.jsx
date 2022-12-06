/* eslint-disable arrow-body-style */
import React from 'react';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { checkIfLoading } from '@Utils/loaderSelector';
import { Creators, Types } from '@Actions/organizationDashboard';

const { toggleModal, patchProjectRequest } = Creators;

function diffObject(a, b) {
  const diffObj = Object.keys(b).reduce((diff, key) => {
    if (a[key] === b[key]) return diff;
    return {
      ...diff,
      [key]: b[key],
    };
  }, {});
  return diffObj;
}

const SaveAsDraft = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.PATCH_PROJECT_REQUEST]),
  );
  const stepOne = useSelector(
    state => state.organizationDashboard.individualProject.stepOne,
  );
  const stepTwo = useSelector(
    state => state.organizationDashboard.individualProject.stepTwo,
  );
  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );

  const finalObj = { ...stepOne, ...stepTwo };
  const diffObj = diffObject(project, finalObj);

  return (
    <div>
      <div className="naxatw-flex naxatw-items-center naxatw-gap-x-5 naxatw-mb-7">
        <span className="naxatw-w-[48px] naxatw-flex naxatw-items-center naxatw-justify-center naxatw-h-[48px] naxatw-rounded-full naxatw-bg-[#DFF2F1] naxatw-text-center ">
          {' '}
          <MaterialIcon
            name="save"
            className="naxatw-text-[32px] naxatw-leading-[32px] naxatw-font-normal naxatw-text-[#00A699]"
          />
        </span>
        <h4>Save as Draft ?</h4>
      </div>
      <span className=" naxatw-text-body-lg naxatw-text-[#484848]">
        Drafts let you save your edits, so you can come back later.
      </span>
      <div className="naxatw-mt-5 naxatw-p-7 naxatw-flex naxatw-justify-center">
        <div className="naxatw-flex naxatw-gap-x-2">
          <Button
            onClick={() => dispatch(toggleModal(''))}
            className="naxatw-w-[5.25rem] naxatw-text-[#00A699] hover:naxatw-underline hover:naxatw-bg-gray-100"
          >
            Discard
          </Button>
          <Button
            onClick={() => {
              dispatch(patchProjectRequest(projectId, diffObj));
            }}
            className="naxatw-btn-primary naxatw-w-[7.563rem]"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
          >
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveAsDraft;
