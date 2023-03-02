/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toastActions from '@Actions/toast';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectDashboard';
import Dropzone from '@Components/common/Dropzone';
import MaterialIcon from '@Components/common/MaterialIcon';
import FileIcon from '@Assets/images/icons/file-icon.svg';
import Button from '@Components/common/Button';
import prepareFormData from '@Utils/prepareFormData';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import { getCSVHeaders } from '@Utils/convertLayerUtils';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import FormErrorMessage from '@Components/common/FormErrorMessage';

const { uploadFeatureImageRequest } = ProjectDashboardCreators;

const currentDate = new Date();

export default function UploadBulkImage() {
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_FEATURE_IMAGE_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  const handleUpload = e => {
    const { files } = e.target;
    if (files.length + uploadedFiles.length > 5) {
      dispatch(
        toastActions.error({
          message: 'Only 5 files can be uploaded at a time.',
        }),
      );
      return;
    }
    Array.from(files).forEach((file, index) => {
      const [filename, extension] = file.name.split('.');
      const prevId = uploadedFiles.at(-1)?.id || 0;
      const fileObj = {
        id: prevId + 1 + index,
        name: filename,
        extension,
        file,
      };
      if (extension === 'zip') {
        setUploadedFiles(prev => [...prev, fileObj]);
      } else {
        dispatch(toastActions.error({ message: 'Only zip format supported' }));
      }
    });
  };

  const handleDelete = id => {
    setUploadedFiles(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (isUploading) return;
    const payloadData = uploadedFiles.map(item => {
      const data = {
        layer: selectedData.id,
        file: item.file,
      };
      return data;
    });
    dispatch(uploadFeatureImageRequest(payloadData));
  };

  return (
    <div>
      {/* <p className="naxatw-text-body-lg">
        Note: The system currently supports datasets with WGS 84 Geographic
        Coordinate System (EPSG: 4326) only.
      </p> */}

      <div
        className="naxatw-mt-2 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <Dropzone
          label="Please upload your images (zip file format)"
          accept=".zip"
          multiple
          onChange={handleUpload}
        />

        {uploadedFiles.map(({ id, file }) => (
          <div key={id} className="naxatw-flex naxatw-flex-col naxatw-gap-2">
            <div
              className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-px-5 naxatw-py-3
                naxatw-flex naxatw-flex-col naxatw-gap-2"
            >
              <div className="naxatw-flex naxatw-justify-between">
                <div className="naxatw-flex naxatw-gap-5">
                  <img src={FileIcon} alt="file-icon" />
                  <div>
                    <p className="naxatw-font-bold naxatw-text-[15px]">
                      {file.name}
                    </p>
                    <p className="naxatw-text-body-md naxatw-text-grey-600">
                      Uploaded on {currentDate.toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
                <a
                  className="naxatw-flex naxatw-items-center naxatw-p-2"
                  onClick={() => handleDelete(id)}
                >
                  <MaterialIcon
                    className="naxatw-text-[#FF0F0F]"
                    name="delete_outline"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isEmpty(uploadedFiles) && (
        <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSubmit}
            isLoading={isUploading}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
