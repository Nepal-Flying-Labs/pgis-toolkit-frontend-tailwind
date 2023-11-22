/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { formatBytes, getFileExtension } from '@Utils/commonUtils';
import useCustomUpload from '@Hooks/useCustomUpload';
import { convertSHPToGeoJSON, validateGeoJSON } from '@Utils/convertLayerUtils';
import { Creators } from '@Actions/organizationDashboard';
import { format } from 'date-fns';
import flatten from '@turf/flatten';
import {
  getGeometryType,
  polygonTypes,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import Button from '../../../common/Button/index';
import MaterialIcon from '../../../common/MaterialIcon/index';
import MapSection from '../MapSection/index';

const { setFileUploadGeojson } = Creators;

function convertToGeoJSON(file) {
  const filename = file[0].name;
  const fileExtension = getFileExtension(filename);
  switch (fileExtension) {
    case 'zip':
      return convertSHPToGeoJSON(file[0]);
    case 'rar':
      return convertSHPToGeoJSON(file[0]);
    case 'json':
      return validateGeoJSON(file[0]);
    case 'geojson':
      return validateGeoJSON(file[0]);
    default:
      break;
  }
  return null;
}

function validateFeatureType(geojson) {
  const types = geojson.features.map(feature => feature.geometry.type);
  // const type = getGeometryType(geojson);
  return types.every(item => polygonTypes.includes(item));
}

function UploadPolygonBoundary({
  uploadedFile,
  setuploadedFile,
  locationType,
  formValues,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [inputRef, onFileUpload] = useCustomUpload();
  const [geojson, setGeojson] = useState(null);
  // const dispatch = useDispatch();
  const onChangeFileUpload = e => {
    const uploadedFileObject = [];
    const { files } = e.target;
    setuploadedFile(files[0]);
    try {
      convertToGeoJSON(files)
        .then(z => {
          if (typeof z === 'object' && !Array.isArray(z) && z !== null) {
            if (validateFeatureType(z)) {
              const convertedGeojson = flatten(z);
              dispatch(setFileUploadGeojson(convertedGeojson));
              setError(false);
            } else {
              setError(true);
              setuploadedFile('');
            }
          } else {
            setError(true);
            setuploadedFile('');
          }
        })
        .catch(err => {
          setError(true);
          setuploadedFile('');
        });
      // eslint-disable-next-line no-shadow
    } catch (err) {
      setError(true);
      setuploadedFile('');
    }
  };

  console.log(uploadedFile);

  return (
    <div className="naxatw-space-y-2">
      <label className="naxatw-label">Upload Polygon Boundary</label>
      <div>
        <div
          className={`naxatw-relative naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-rounded-xl ${
            error ? 'naxatw-border naxatw-border-red-500' : ''
          }`}
        >
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder "
            iconLeft="upload"
            onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload
            </span>
          </Button>
          <div>
            <span className="naxatw-text-body-md naxatw-text-[#484848]">
              The system currently supports datasets in geojson and shapefile
              formats with WGS 84 Geographic Coordinate System (EPSG: 4326)
              only.
            </span>
          </div>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => onChangeFileUpload(e)}
            multiple="multiple"
            accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream/,.geojson"
          />
        </div>
        {error && (
          <span className="naxatw-text-[#FF0F0F]">File not supported</span>
        )}
      </div>

      <div className="form-group">
        {uploadedFile && (
          <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mb-2 naxatw-px-[20px] naxatw-py-[15px] naxatw-border naxatw-border-[#D7D7D7] naxatw-rounded-xl">
            <div className="naxatw-flex naxatw-gap-x-5 naxatw-items-center">
              <span className="naxatw-w-[40px] naxatw-h-[40px] naxatw-rounded-full naxatw-bg-red-50 naxatw-text-center naxatw-border naxatw-border-[#D7D7D7] naxatw-flex naxatw-justify-center naxatw-items-center">
                <MaterialIcon
                  name="description"
                  className="naxatw-text-2xl naxatw-leading-10 naxatw-text-red-500"
                />
              </span>
              <div>
                <p className="naxatw-text-[15px] naxatw-leading-[22px] naxatw-font-bold naxatw-text-[#484848]">
                  {uploadedFile.name}
                </p>
                <span className="naxatw-text-body-md naxatw-text-[#757575]">
                  Uploaded on{' '}
                  {format(new Date(uploadedFile.lastModified), 'MM/dd/yyyy') ||
                    '-'}
                </span>
              </div>
            </div>
            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4">
              <a
                href={uploadedFile?.fileURL}
                className="hover:naxatw-bg-grey-100 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
              >
                <MaterialIcon
                  name="download"
                  className="naxatw-text-[#484848] naxatw-cursor-pointer"
                  title="Download"
                />
              </a>
              <a
                onClick={() => {
                  setuploadedFile('');
                  dispatch(setFileUploadGeojson(null));
                }}
                className="hover:naxatw-bg-grey-100 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
              >
                <MaterialIcon
                  name="delete_outline"
                  className="naxatw-text-red-500 naxatw-cursor-pointer"
                  title="Remove"
                />
              </a>
            </div>
          </div>
        )}
      </div>

      <MapSection geojson={geojson} formValues={formValues} />
    </div>
  );
}

export default UploadPolygonBoundary;
