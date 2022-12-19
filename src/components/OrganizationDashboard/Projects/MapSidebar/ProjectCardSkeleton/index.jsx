/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';

const ProjectCardSkeleton = ({ itemNumber }) => {
  return Array.from({ length: itemNumber }, (_, i) => (
    <div
      key={i}
      className="naxatw-w-full naxatw-px-5 naxatw-py-4 naxatw-animate-pulse naxatw-bg-white naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-cursor-pointer hover:naxatw-border-grey-800"
    >
      <div className="naxatw-flex naxatw-justify-between">
        <div className="naxatw-bg-gray-200 naxatw-w-[100px] naxatw-h-4" />
        <span className="naxatw-bg-gray-200 naxatw-w-[20px] naxatw-h-4" />
      </div>
      <div className="naxatw-mt-6 naxatw-w-[200px] naxatw-h-4 naxatw-bg-gray-200">
        <span className="naxatw-w-[200px] naxatw-bg-gray-200 naxatw-h-4" />
      </div>
    </div>
  ));
};

export default ProjectCardSkeleton;
