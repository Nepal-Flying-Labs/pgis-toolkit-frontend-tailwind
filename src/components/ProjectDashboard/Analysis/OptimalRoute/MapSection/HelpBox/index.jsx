import React from 'react';
import { useSelector } from 'react-redux';

export default function HelpBox() {
  const drawPointType = useSelector(
    state => state.routeAnalysis.dataInput.drawPointType,
  );

  if (!drawPointType) return '';

  return (
    <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
      <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-flex-col naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
        <h5>
          Draw a point on the map and click on the Save icon in the toolbar.
        </h5>
      </span>
    </div>
  );
}
