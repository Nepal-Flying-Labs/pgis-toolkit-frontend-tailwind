/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import capitalizeFirstLetter from '@src/utils/capitalizeFirstLetter';
// import { popupExceptionKeys } from '@src/constants/map';

const exceptions = [
  // ...popupExceptionKeys,
];

export default function PopupUI({ data = {} }) {
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

  return (
    <ul className=" naxatw-flex naxatw-flex-col naxatw-gap-2 ">
      {popupData &&
        Object.keys(popupData).map(key => (
          <li
            key={key}
            className="naxatw-flex naxatw-items-center naxatw-text-grey-900"
          >
            <p className="naxatw-w-1/2 naxatw-text-grey-900">{key}</p>
            <p className="naxatw-text-grey-900 naxatw-w-1/2">
              {popupData[key]?.toString() || '-'}
            </p>
          </li>
        ))}
    </ul>
  );
}
