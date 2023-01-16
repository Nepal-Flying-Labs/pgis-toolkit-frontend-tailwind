/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectDashboard';
import toastActions from '@Actions/toast';
import Dropzone from '@Components/common/Dropzone';
import MaterialIcon from '@Components/common/MaterialIcon';
import FileIcon from '@Assets/images/icons/file-icon.svg';
import Button from '@Components/common/Button';
import prepareFormData from '@Utils/prepareFormData';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { format, getDate, getMonth, getYear } from 'date-fns';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';

const { uploadDocumentDataRequest } = ProjectDashboardCreators;

export default function UploadDocument() {
  const { projectId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorFields, setErrorFields] = useState({});
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_DOCUMENT_DATA_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentDate = new Date();

  const handleDelete = id => {
    setUploadedFiles(prev => prev.filter(item => item.id !== id));
  };

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
        description: '',
        created_on: '',
        // initial states
      };
      setUploadedFiles(prev => [...prev, fileObj]);
    });
  };

  const handleChange = e => {
    const { id, name, value } = e.target;
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, [name]: value } : { ...item },
      ),
    );
  };

  const handleDateSelect = (id, name, value) => {
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, [name]: value } : { ...item },
      ),
    );
  };

  const handleSubmit = () => {
    if (isUploading) return;
    let errorCount = 0;
    const errors = uploadedFiles.reduce((obj, item) => {
      const fields = [];
      // form validation
      if (!item.name) fields.push('name');
      if (fields.length) errorCount += 1;
      if (!item.created_on) fields.push('created_on');
      if (fields.length) errorCount += 1;
      return {
        ...obj,
        [item.id]: fields,
      };
    }, {});
    setErrorFields(errors);
    if (errorCount === 0) {
      const payloadData = uploadedFiles.map(item => {
        const data = {
          name: item.name,
          project: projectId,
          description: item.description,
          published_year: getYear(new Date(item.created_on)),
          published_month: monthNames[getMonth(new Date(item.created_on))],
          published_day: getDate(new Date(item.created_on)),
          file: item.file,
        };
        return prepareFormData(data);
      });
      dispatch(uploadDocumentDataRequest(projectId, payloadData));
    } else {
      dispatch(
        toastActions.error({
          message: 'Please fill out all the required fields.',
        }),
      );
    }
  };

  return (
    <div>
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Upload a document</label>
          <Dropzone
            label="Please upload a document (DOCX, PDF, Excel or CSV file format)"
            accept=".docx, .pdf, .csv, .pdf, .xlxs"
            multiple
            onChange={handleUpload}
          />
          {uploadedFiles?.map(
            ({
              id,
              name,
              description,
              // eslint-disable-next-line camelcase
              created_on,
              file,
            }) => (
              <div
                key={id}
                className="naxatw-flex naxatw-flex-col naxatw-gap-2"
              >
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
                        className="naxatw-text-delete_btn"
                        name="delete_outline"
                      />
                    </a>
                  </div>

                  <div className="naxatw-flex naxatw-gap-3">
                    <div className="naxatw-space-y-2 naxatw-grow">
                      <label className="naxatw-label">Title*</label>
                      <input
                        type="text"
                        className="naxatw-input"
                        id={id}
                        name="name"
                        value={name || ''}
                        placeholder="Enter Data Name"
                        onChange={handleChange}
                      />
                      {errorFields?.[id]?.includes('name') && (
                        <FormErrorMessage message="This field is required" />
                      )}
                    </div>
                  </div>

                  <div className="naxatw-flex naxatw-gap-3">
                    <div className="naxatw-space-y-2 naxatw-grow">
                      <label className="naxatw-label">About the Document</label>
                      <textarea
                        type="text"
                        rows="3"
                        className="naxatw-input naxatw-h-[100px]"
                        id={id}
                        name="description"
                        value={description || ''}
                        placeholder="Write a short description about document"
                        onChange={handleChange}
                      />
                      {errorFields?.[id]?.includes('description') && (
                        <FormErrorMessage message="Required" />
                      )}
                    </div>
                  </div>

                  <div className="naxatw-flex naxatw-gap-3">
                    <div className="naxatw-space-y-2 naxatw-grow">
                      <label className="naxatw-label">Created on*</label>
                      <CustomCalendar
                        onChange={date => {
                          handleDateSelect(
                            id,
                            'created_on',
                            format(date, 'yyyy-MM-dd'),
                          );
                        }}
                        startDate={new Date()}
                        // eslint-disable-next-line camelcase
                        selected={created_on}
                      />
                      {errorFields?.[id]?.includes('created_on') && (
                        <FormErrorMessage message="This field is required" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
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
