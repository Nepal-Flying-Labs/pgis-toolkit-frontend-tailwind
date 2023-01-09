import React from 'react';
import { useSelector } from 'react-redux';

export default function HelpBox() {
  const drawFeatureId = useSelector(
    state => state.dataCleaning.manualFix.drawFeatureId,
  );

  if (!drawFeatureId) return '';

  return (
    <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
      <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
        <h5 className="">Select features you want to snap to </h5>
      </span>
    </div>
  );
}
