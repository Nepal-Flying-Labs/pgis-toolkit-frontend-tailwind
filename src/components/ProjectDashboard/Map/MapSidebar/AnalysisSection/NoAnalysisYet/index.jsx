import React from 'react';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import NoAnalysisYetImg from '@Assets/images/no-analysis-yet.png';
import Button from '@Components/common/Button/index';

const { toggleModal } = CommonCreators;

export default function NoAnalysisYet() {
  const dispatch = useDispatch();

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-10 naxatw-items-center">
      <img width={60} height={60} src={NoAnalysisYetImg} alt="no-data-yet" />
      <h3 className="naxatw-mt-7 naxatw-font-bold">No Analysis yet</h3>
      <p className="naxatw-mt-2 naxatw-text-center naxatw-text-body-lg">
        Click to start
      </p>
      <Button
        className="naxatw-btn-primary naxatw-mt-7"
        iconLeft="add"
        onClick={() => {
          dispatch(toggleModal('analysis'));
        }}
      >
        Analysis
      </Button>
    </div>
  );
}
