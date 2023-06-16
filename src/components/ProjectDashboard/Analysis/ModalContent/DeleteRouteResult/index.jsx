import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators } from '@Actions/routeAnalysis';
import Button from '@Components/common/Button';

const { togglePromptDialog } = CommonCreators;
const { deleteOptimumRouteResultRequest } = Creators;

export default function DeleteRouteResult() {
  const selectedAnalysis = useSelector(
    state => state.routeAnalysis.results.selectedAnalysis,
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    const formdata = {
      is_deleted: true,
    };
    dispatch(deleteOptimumRouteResultRequest(selectedAnalysis?.id, formdata));
  };

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>Are you sure to delete {selectedAnalysis?.name}?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Cancel
        </Button>
        <Button
          className="naxatw-bg-delete_btn naxatw-text-white"
          iconLeft="delete_outline"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
