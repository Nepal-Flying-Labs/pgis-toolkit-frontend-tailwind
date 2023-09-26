/* eslint-disable arrow-body-style */
import React from 'react';
import { useDispatch } from 'react-redux';
import Creators from '@Actions/landing';

const { getFileForDownloadRequest } = Creators;

const AccordionDownloadDetail = () => {
  const dispatch = useDispatch();
  return (
    <span>
      Yes, we can. Please check in the following links to download them in{' '}
      <span
        className="csv-link"
        style={{ color: '#4649EF' }}
        type="button"
        onClick={() => {
          dispatch(getFileForDownloadRequest({ output_format: 'shapefile' }));
        }}
      >
        .shp format
      </span>{' '}
      and{' '}
      <span
        className="csv-link"
        style={{ color: '#4649EF' }}
        type="button"
        onClick={() =>
          dispatch(getFileForDownloadRequest({ output_format: 'csv' }))
        }
      >
        .csv format
      </span>
      .
    </span>
  );
};

export default AccordionDownloadDetail;
