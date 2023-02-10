/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Types } from '@Actions/dataCleaning';
import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { toggleModal } = CommonCreators;

export default function SaveManualFix() {
  const errorFeaturesData = useSelector(
    state => state.dataCleaning.errorFeaturesData,
  );
  const isChecking = useSelector(state =>
    checkIfLoading(state, [
      Types.VALIDATE_ERROR_FIX_REQUEST,
      Types.GET_ERROR_FEATURES_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const hasError = Object.values(errorFeaturesData).some(item => item.length);

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>
          {isChecking
            ? 'Please wait while validating..'
            : hasError
            ? 'Seems like there are still errors left that needs to be fixed.'
            : 'There are no errors left.'}
        </h4>
      </div>

      {!isChecking && (
        <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-gap-2">
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder"
            onClick={() => {
              dispatch(toggleModal());
            }}
          >
            Close
          </Button>
          <Button
            className="naxatw-btn-primary"
            loaderClassName="naxatw-fill-secondary-400"
            onClick={() => {
              dispatch(toggleModal());
            }}
          >
            {hasError ? 'Continue Fixing' : 'Done'}
          </Button>
        </div>
      )}
    </div>
  );
}
