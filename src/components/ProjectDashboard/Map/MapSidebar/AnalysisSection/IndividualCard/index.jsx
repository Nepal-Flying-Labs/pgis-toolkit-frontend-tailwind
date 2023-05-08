import DropdownOptions from '@Components/common/DropdownOptions/index';
import React from 'react';

export default function IndividualCard() {
  return (
    <div
      className="naxatw-bg-white naxatw-p-3 naxatw-rounded-lg naxatw-border 
        naxatw-border-grey-300"
    >
      <div className="naxatw-flex naxatw-justify-between">
        <p className="naxatw-text-body-btn">Title</p>
        <DropdownOptions options={[]} />
      </div>
      <p className="naxatw-text-body-md">Jan 04, 2024</p>
    </div>
  );
}
