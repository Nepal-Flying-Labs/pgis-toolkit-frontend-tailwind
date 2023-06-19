/* eslint-disable react/self-closing-comp */
import React from 'react';

const AnalysisSkeleton = ({ itemNumber }) =>
  Array.from({ length: itemNumber }, (_, i) => (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-1">
      <div
        key={i}
        role="status"
        className="naxatw-max-w-md naxatw-p-4 naxatw-space-y-4 naxatw-border naxatw-border-gray-200 naxatw-divide-y naxatw-divide-gray-200 naxatw-rounded naxatw-shadow naxatw-animate-pulse naxatw-dark:divide-gray-700 naxatw-md:p-6 naxatw-dark:border-gray-700"
      >
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <div>
            <div className="naxatw-h-[0.625rem] naxatw-bg-gray-300 naxatw-rounded-full naxatw-dark:bg-gray-600 naxatw-w-24 naxatw-mb-[1.4rem]"></div>
            <div className="naxatw-w-32 naxatw-h-2 naxatw-bg-gray-200 naxatw-rounded-full naxatw-dark:bg-gray-700"></div>
          </div>
          <div className="naxatw-h-[1.625rem] naxatw-bg-gray-300 naxatw-rounded-full naxatw-dark:bg-gray-700 naxatw-w-[0.435rem] naxatw-mr-[0.48rem]"></div>
        </div>
      </div>
    </div>
  ));

export default AnalysisSkeleton;
