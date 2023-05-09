/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import DropdownOptions from '@Components/common/DropdownOptions/index';
import React from 'react';

export default function IndividualCard({ data }) {
  return (
    <div
      className="naxatw-bg-white naxatw-p-3 naxatw-rounded-lg naxatw-border 
        naxatw-border-grey-300 hover:naxatw-border-grey-800 naxatw-cursor-pointer"
    >
      <div className="naxatw-flex naxatw-justify-between">
        <p className="naxatw-text-body-btn">{data.name}</p>
        <DropdownOptions options={[]} />
      </div>
      <p className="naxatw-text-body-md">
        {format(new Date(data.uploaded_date), 'MMM dd, yyyy')}
      </p>
    </div>
  );
}
