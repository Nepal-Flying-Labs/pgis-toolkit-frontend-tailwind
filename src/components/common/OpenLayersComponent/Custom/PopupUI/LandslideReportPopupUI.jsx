/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import capitalizeFirstLetter from '@src/utils/capitalizeFirstLetter';
import { popupExceptionKeys } from '@src/constants/map';
import './popupUI.scss';

const exceptions = [...popupExceptionKeys, 'title', 'subtitle', 'description'];

const { FULL_URL } = process.env;

const LandslideReportPopupUI = ({ data = {} }) => {
  const popupData = Object.keys(data).reduce((obj, key) => {
    const name = capitalizeFirstLetter(key);
    const exceptionKeys = [...exceptions];
    const value = data[key];
    if (key === 'date') {
      const date = new Date(value);
      return { ...obj, [name]: format(date, ['MMM do yyyy, h:mm a']) };
    }
    if (key === 'image') {
      const url = `${FULL_URL}/media/${value}`;
      return { ...obj, [name]: url };
    }
    if (exceptionKeys.includes(key)) {
      return { ...obj };
    }
    return { ...obj, [name]: value };
  }, {});

  return (
    <div className="map-popup-container">
      <div className="map-popup-body">
        <div className="map-popup-header">
          <h3>{data?.title}</h3>
          {data.subtitle && <h5>{data.subtitle}</h5>}
          {/* <h5>Dummy Text</h5> */}
        </div>
        <div className="map-popup-content">
          <ul className="map-popup-list">
            {popupData &&
              Object.keys(popupData).map(key => (
                <li key={key}>
                  <p>{key}</p>
                  {key === 'Image' ? (
                    <img src={popupData[key]} alt="landslide-img" />
                  ) : (
                    <b>{popupData[key]?.toString() || '-'}</b>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandslideReportPopupUI;
