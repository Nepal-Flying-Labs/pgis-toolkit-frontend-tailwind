/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import './popupUI.scss';
import Button from '@Components/common/Button';
import capitalizeFirstLetter from '@src/utils/capitalizeFirstLetter';
import { popupExceptionKeys } from '@src/constants/map';

const SubmissionPopupUI = ({ data = {} }) => {
  const popupData = Object.keys(data).reduce((obj, key) => {
    const name = capitalizeFirstLetter(key);
    const value = data[key];
    if (key === 'submitted_date') {
      const date = new Date(value);
      return { ...obj, [name]: format(date, ['MMM do yyyy, h:mm a']) };
    }
    if (popupExceptionKeys.includes(key)) {
      return { ...obj };
    }
    return { ...obj, [name]: value };
  }, {});

  return (
    <>
      <table>
        {popupData &&
          Object.keys(popupData).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <b>{popupData[key]?.toString()}</b>
              </td>
            </tr>
          ))}
      </table>

      <a
        className="common-button is-clear link__button mt-10"
        href={`/projects/${data.project_id}/site/${data.site_id}/submission/${data.submission}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button label="Go to submission" />
      </a>
    </>
  );
};

export default SubmissionPopupUI;
