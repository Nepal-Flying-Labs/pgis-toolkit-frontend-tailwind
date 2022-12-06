/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import { formatBytes, getFileExtension } from '@Utils/commonUtils';
import useCustomUpload from '@Hooks/useCustomUpload';
import { convertSHPToGeoJSON, validateGeoJSON } from '@Utils/convertLayerUtils';
import Button from '../../../common/Button/index';
import MaterialIcon from '../../../common/MaterialIcon/index';
import MapSection from '../MapSection/index';

// eslint-disable-next-line no-unused-vars
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
function UploadPolygonBoundary({ uploadedFile, setuploadedFile }) {
  // eslint-disable-next-line no-unused-vars
  // const [uploadedFile, setuploadedFile] = useState([]);
  const [error, setError] = useState(false);
  const [inputRef, onFileUpload] = useCustomUpload();
  const [geojson, setGeojson] = useState(null);
  // const dispatch = useDispatch();
  const onChangeFileUpload = e => {
    const uploadedFileObject = [];
    const { files } = e.target;
    const propertiesKey = [];
    try {
      convertToGeoJSON(files).then(z => {
        Object.keys(z.features[0].properties).forEach(key => {
          propertiesKey.push({ label: key, name: key });
        });
        Object.values(files).forEach((x, i) => {
          // const convertedFile = null;
          uploadedFileObject.push({
            id: i + 1,
            file: x,
            geojson: z,
            filename: x.name,
            size: formatBytes(x.size),
          });
          setGeojson(z);
        });
        setuploadedFile(uploadedFileObject);
        setError(false);
      });
      // eslint-disable-next-line no-shadow
    } catch (err) {
      // dispatch(error({ message: 'File Not Supported' }));
      setError(true);
    }
  };

  const deleteFile = id => {
    const toDeleteFile = uploadedFile.filter(data => data.id !== id);
    setuploadedFile(toDeleteFile);
    setGeojson(null);
    // const toDeleteFileNames = toDeleteFile.map((data) => data.filename);
    inputRef.current.value = '';
  };
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
            className="naxatw-flex naxatw-items-center naxatw-gap-x-2 "
            onClick={onFileUpload}
          >
            <MaterialIcon
              name="upload"
              className="naxatw-2xl naxatw-text-[#00A699]"
            />
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload
            </span>
          </Button>
          <div>
            <span className="naxatw-text-body-md naxatw-text-[#484848]">
              SHP or GEOJSON format supported
            </span>
          </div>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => onChangeFileUpload(e)}
            multiple="multiple"
          />
        </div>
        {error && (
          <span className="naxatw-text-[#FF0F0F]">File not supported</span>
        )}
      </div>

      <div className="form-group">
        {uploadedFile.map(
          file =>
            !file.isDeleted && (
              <div
                key={file.id}
                className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mb-2 naxatw-px-[20px] naxatw-py-[15px] naxatw-border naxatw-border-[#D7D7D7] naxatw-rounded-xl"
              >
                <div className="naxatw-flex naxatw-gap-x-5 naxatw-items-center">
                  <span className="naxatw-w-[40px] naxatw-h-[40px] naxatw-rounded-full naxatw-bg-red-50 naxatw-text-center naxatw-border naxatw-border-[#D7D7D7]">
                    {' '}
                    <MaterialIcon
                      name="description"
                      className="naxatw-text-2xl naxatw-leading-10 naxatw-text-red-500"
                    />
                  </span>
                  <div>
                    <p className="naxatw-text-[15px] naxatw-leading-[22px] naxatw-font-bold naxatw-text-[#484848]">
                      {file.filename}
                    </p>
                    <span className="naxatw-text-body-md naxatw-text-[#757575]">
                      Uploaded on 16/11/2022
                    </span>
                  </div>
                </div>
                <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4">
                  <MaterialIcon
                    name="download"
                    className="naxatw-text-[#484848] naxatw-cursor-pointer"
                  />
                  <a onClick={() => deleteFile(file.id)}>
                    <MaterialIcon
                      name="delete_outline"
                      className="naxatw-text-red-500 naxatw-cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            ),
        )}
      </div>
      <MapSection geojson={geojson} />
    </div>
  );
}

export default UploadPolygonBoundary;
