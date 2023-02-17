import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/dataCleaning';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { getFeaturesGeojsonRequest } = Creators;

export default function HelpBox() {
  const selectedError = useSelector(
    state => state.dataCleaning.manualFix.selectedError,
  );
  const selectedFeaturesForSnap = useSelector(
    state => state.dataCleaning.manualFix.selectedFeaturesForSnap,
  );
  const startEditing = useSelector(
    state => state.dataCleaning.manualFix.startEditing,
  );
  const isDataFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_FEATURES_GEOJSON_REQUEST]),
  );
  const dispatch = useDispatch();

  if (!selectedError?.type || startEditing) return '';

  return (
    <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
      <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-flex-col naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
        <h5 className="">
          Hover and click on the features you want to snap to and click on Start
          Editing.
        </h5>
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
          isLoading={isDataFetching}
          onClick={() =>
            dispatch(getFeaturesGeojsonRequest(selectedFeaturesForSnap))
          }
        >
          Start Editing
        </Button>
      </span>
    </div>
  );
}
