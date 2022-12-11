/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const getColor = status => {
  switch (status) {
    case 'active':
      return { bg: 'naxatw-bg-green-500', text: 'naxatw-text-green-500' };
    case 'inactive':
      return { bg: 'naxatw-bg-red-500', text: 'naxatw-text-red-500' };
    default:
      return { bg: 'naxatw-bg-blue-500', text: 'naxatw-text-blue-500' };
  }
};

const Status = ({ status }) => {
  const stat = getColor(status.toLowerCase());
  return (
    <div className=" naxatw-flex naxatw-items-center naxatw-gap-x-2">
      <div className={`naxatw-w-2 naxatw-h-2 ${stat.bg} naxatw-rounded-full`} />
      <span className={`naxatw-text-body-md ${stat.text}`}>{status}</span>
    </div>
  );
};

export default Status;
