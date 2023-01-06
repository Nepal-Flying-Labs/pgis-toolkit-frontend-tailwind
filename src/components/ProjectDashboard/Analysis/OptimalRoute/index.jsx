import React from 'react';
import { useSelector } from 'react-redux';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ManualFix from './ManualFix';

function getStepWiseContent(step) {
  switch (step) {
    case 1:
      return <StepOne />;
    case 2:
      return <StepTwo />;
    default:
      return <StepOne />;
  }
}

export default function OptimalRoute() {
  const stepIndex = useSelector(state => state.analysis.stepIndex);
  const manualFixLayerId = useSelector(
    state => state.analysis.manualFixLayerId,
  );

  return manualFixLayerId ? (
    <ManualFix />
  ) : (
    <div className="naxatw-flex naxatw-grow naxatw-justify-center naxatw-py-[19px] naxatw-overflow-y-auto scrollbar">
      <div className="naxatw-w-[34.5rem]">{getStepWiseContent(stepIndex)}</div>
    </div>
  );
}
