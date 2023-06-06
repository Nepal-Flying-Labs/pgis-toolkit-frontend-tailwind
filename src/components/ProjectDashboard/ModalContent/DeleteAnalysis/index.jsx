import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteAnalysisRequest } = ProjectMapCreators;
const { togglePromptDialog } = CommonCreators;

export default function DeleteAnalysis() {
  const deleteAnalysis = useSelector(
    state => state.projectMap.selectedAnalysis,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [ProjectMapTypes.DELETE_ANALYSIS_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (isDeleting) return;
    dispatch(
      deleteAnalysisRequest(deleteAnalysis?.id, {
        is_deleted: true,
      }),
    );
  };

  return (
    <div>
      <div className="naxatw-px-4 naxatw-text-center">
        <h4>Are you sure to delete &apos;{deleteAnalysis?.name}&apos;?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-12 naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Cancel
        </Button>
        <Button
          className="naxatw-bg-[#FF0F0F] naxatw-text-white"
          iconLeft="delete_outline"
          isLoading={isDeleting}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
