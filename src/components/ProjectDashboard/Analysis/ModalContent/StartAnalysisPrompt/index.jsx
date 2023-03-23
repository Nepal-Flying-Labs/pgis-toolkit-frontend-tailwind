import React from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Creators as DataCleaningCreators } from '@Actions/dataCleaning';
import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';

const { startAnalysisRequest } = DataCleaningCreators;
const { togglePromptDialog } = CommonCreators;

export default function StartAnalysisPrompt() {
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <div className="naxatw-space-y-3">
      Starting analysis without fixing the errors could produce erroneous
      results. You may include the steps for automatic fix and manual fix for
      better results.
      <div className="naxatw-py-5 naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          onClick={() => {
            dispatch(startAnalysisRequest(params));
            dispatch(togglePromptDialog());
          }}
        >
          Start Anyway
        </Button>
      </div>
    </div>
  );
}
