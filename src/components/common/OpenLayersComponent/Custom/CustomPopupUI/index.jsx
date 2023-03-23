/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import capitalizeFirstLetter from '@src/utils/capitalizeFirstLetter';
// import { popupExceptionKeys } from '@src/constants/map';

const exceptions = [
  // ...popupExceptionKeys,
  'pois',
  'analysis_id',
];

export default function CustomPopupUI({ data = {} }) {
  const popupData = Object.keys(data).reduce((obj, key) => {
    const name = capitalizeFirstLetter(key);
    const exceptionKeys = [...exceptions];
    const value = data[key];
    if (key === 'submitted_date') {
      const date = new Date(value);
      return { ...obj, [name]: format(date, ['MMM do yyyy, h:mm a']) };
    }
    if (exceptionKeys.includes(key)) {
      return { ...obj };
    }
    return { ...obj, [name]: value };
  }, {});

  const { Name, Image, Url, ...filterData } = popupData;
  console.log(data, 'data');

  return (
    <ul className=" naxatw-flex naxatw-flex-col naxatw-gap-2 ">
      {filterData &&
        Object.keys(filterData).map(key => (
          <li
            key={key}
            className="naxatw-flex naxatw-items-start naxatw-text-grey-900"
          >
            <p className="naxatw-w-1/2 naxatw-text-grey-900 naxatw-text-body-lg">
              {key}
            </p>
            <p className="naxatw-text-grey-900 naxatw-w-1/2 naxatw-text-body-lg naxatw-break-words">
              {filterData[key]?.toString() || '-'}
            </p>
          </li>
        ))}
    </ul>
  );
}
