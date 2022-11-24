/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import Button from '@Components/common/Button';
import capitalizeFirstLetter from '@src/utils/capitalizeFirstLetter';
import { popupExceptionKeys } from '@src/constants/map';
import './popupUI.scss';

const exceptions = [
  ...popupExceptionKeys,
  'title',
  'subtitle',
  'name',
  'region_name',
];

const SitePopupUI = ({ data = {}, isPublicMap = true }) => {
  const popupData = Object.keys(data).reduce((obj, key) => {
    const name = capitalizeFirstLetter(key);
    const exceptionKeys = [...exceptions];
    if (isPublicMap) {
      exceptionKeys.push('submission_count');
    }
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
                  <b>{popupData[key]?.toString() || '-'}</b>
                </li>
              ))}
          </ul>
        </div>
        {!isPublicMap && (
          <div className="map-popup-footer">
            <ul className="communication">
              <li>
                <a
                  className="common-button is-clear link__button mt-10"
                  href={`/projects/${data.project_id}/site/${data.site_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button label="Go to site" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitePopupUI;
