import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as DataCleaningCreators,
  Types as DataCleaningTypes,
} from '@Actions/dataCleaning';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { togglePromptDialog } = CommonCreators;
const { deleteFeatureRequest } = DataCleaningCreators;

export default function DeleteError() {
  const selectedError = useSelector(
    state => state.dataCleaning.manualFix.selectedError,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [DataCleaningTypes.DELETE_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  console.log(selectedError, 'selectedErrorx');

  const handleDelete = () => {
    if (isDeleting) return;
    dispatch(deleteFeatureRequest(selectedError.id));
  };

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>Are you sure to delete {selectedError?.id}?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Discard
        </Button>
        <Button
          className="naxatw-bg-delete_btn naxatw-text-white"
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
