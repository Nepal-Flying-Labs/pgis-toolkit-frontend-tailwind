/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
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
import useForm from '@Hooks/useForm';

const { updateDocumentDataRequest } = ProjectDashboardCreators;

export default function EditDocument() {
  const { projectId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorFields, setErrorFields] = useState({});
  const document = useSelector(state => state.projectDashboard.document.item);
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_DOCUMENT_DATA_REQUEST]),
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

  const formSubmit = () => {
    if (isUploading) return;
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    setErrorFields(errors);

    if (isEmpty(errorFields)) {
      // console.log(values);
      const formData = {
        name: values.name,
        description: values.description,
        uploaded_date: format(new Date(values.uploaded_date), 'MMM dd , yyyy'),
      };
      dispatch(
        updateDocumentDataRequest({
          projectId,
          documentId: values.id,
          data: formData,
        }),
      );
    }
  };

  const { values, handleChange, handleCustomChange, handleSubmit, setValues } =
    useForm({
      initialValues: document,
      // required: ['name'],
      onSubmit: formSubmit,
    });

  useEffect(() => {
    if (isEmpty(document)) return null;
    return setValues(document);
  }, [document, setValues]);

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

  // const handleChange = e => {
  //   const { id, name, value } = e.target;
  //   setUploadedFiles(prev =>
  //     prev.map(item =>
  //       item.id === +id ? { ...item, [name]: value } : { ...item },
  //     ),
  //   );
  // };

  const handleDateSelect = (id, name, value) => {
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, [name]: value } : { ...item },
      ),
    );
  };

  return (
    <div>
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Title*</label>
            <input
              type="text"
              className="naxatw-input"
              // id={values.id || '-'}
              name="name"
              value={values.name || ''}
              placeholder="Enter Data Name"
              onChange={handleChange}
            />
            {errorFields?.name && <FormErrorMessage message="Required" />}
          </div>
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">About the Document</label>
            <textarea
              type="text"
              rows="3"
              className="naxatw-input naxatw-h-[100px]"
              // id={values.id}
              name="description"
              value={values.description || ''}
              placeholder="Write a short description about document"
              onChange={handleChange}
            />
            {errorFields?.description && (
              <FormErrorMessage message="Required" />
            )}
          </div>
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Uploaded on</label>
            <CustomCalendar
              onChange={date => {
                handleCustomChange(
                  // values.id,
                  'uploaded_date',
                  format(date, 'yyyy-MM-dd'),
                );
              }}
              startDate={new Date()}
              // eslint-disable-next-line camelcase
              selected={
                (values.uploaded_date &&
                  format(new Date(values.uploaded_date), 'MMM dd, yyyy')) ||
                ''
              }
            />
            {/* {errorFields?.[values.id]?.includes('uploaded_date') && (
              <FormErrorMessage message="Required" />
            )} */}
          </div>
        </div>
      </div>

      {/* {isEmpty(errorFields) && ( */}
      <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          onClick={handleSubmit}
          isLoading={isUploading}
        >
          Update
        </Button>
      </div>
      {/* )} */}
    </div>
  );
}
