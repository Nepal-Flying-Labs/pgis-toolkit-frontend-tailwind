import React from 'react';
import { useSelector } from 'react-redux';
import StepOne from './StepOne/index';

function getStepWiseContent(step) {
  switch (step) {
    case 1:
      return <StepOne />;
    default:
      return <StepOne />;
  }
}

export default function OptimalRoute() {
  const stepIndex = useSelector(state => state.analysis.stepIndex);

  return (
    <div className="naxatw-flex naxatw-grow naxatw-justify-center naxatw-py-[19px]">
      <div className="naxatw-w-[34.5rem]">{getStepWiseContent(stepIndex)}</div>
    </div>
  );
}
