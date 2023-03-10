/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const TableSkeleton = ({ itemNumber }) => {
  return (
    <table className="naxatw-animate-pulse naxatw-w-full naxatw-border-separate naxatw-border-spacing-y-4 ">
      {Array.from({ length: itemNumber }, (_, i) => (
        <thead key={i} className="naxatw-w-full">
          <tr className=" naxatw-w-full naxatw-flex naxatw-gap-x-40 naxatw-h-8">
            <th className="naxatw-bg-gray-100 naxatw-w-[200px]">
              <div
                className="naxatw-bg-gray-200"
                style={{ width: '100%', height: '20px' }}
              />
            </th>
            <th className="naxatw-bg-gray-100 naxatw-w-[250px] naxatw-mr-[280px]">
              <div
                className="naxatw-bg-gray-200"
                style={{ width: '100%', height: '20px' }}
              />
            </th>
            <th className="naxatw-bg-gray-100 naxatw-w-[200px] naxatw-mr-[40px]">
              <div
                className=" naxatw-bg-gray-200"
                style={{ width: '100%', height: '20px' }}
              />
            </th>
            <th className="naxatw-bg-gray-100 naxatw-w-[150px]">
              <div
                className="naxatw-bg-gray-200"
                style={{ width: '100%', height: '20px' }}
              />
            </th>
            <th className="naxatw-bg-gray-100 naxatw-w-[50px]">
              <div
                className="naxatw-bg-gray-200"
                style={{ width: '100%', height: '20px' }}
              />
            </th>
          </tr>
        </thead>
      ))}
    </table>
  );
};

export default TableSkeleton;
