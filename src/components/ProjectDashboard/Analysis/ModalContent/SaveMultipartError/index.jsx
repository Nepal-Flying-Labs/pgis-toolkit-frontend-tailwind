import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as DataCleaningCreators, Types } from '@Actions/dataCleaning';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { saveExplodedFeaturesRequest } = DataCleaningCreators;
const { togglePromptDialog } = CommonCreators;

export default function SaveMultipartError() {
  const isSaving = useSelector(state =>
    checkIfLoading(state, [Types.SAVE_ROUTE_LAYER_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(saveExplodedFeaturesRequest());
  };

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>Are you sure to save this edit?</h4>
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
          className="naxatw-btn-primary"
          isLoading={isSaving}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
