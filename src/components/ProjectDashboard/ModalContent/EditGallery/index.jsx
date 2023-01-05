/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { format } from 'date-fns';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import useForm from '@Hooks/useForm';

const { updateGalleryRequest } = ProjectDashboardCreators;

export default function EditGallery() {
  const [errorFields, setErrorFields] = useState({});
  const document = useSelector(state => state.projectDashboard.gallery.item);
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_GALLERY_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  const formSubmit = () => {
    if (isUploading) return;
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    setErrorFields(errors);

    if (isEmpty(errorFields)) {
      const formData = {
        title: values.title,
        caption: values.caption,
        uploaded_date: format(new Date(values.uploaded_date), 'MMM dd , yyyy'),
      };
      dispatch(updateGalleryRequest(values.id, formData));
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

  return (
    <div>
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-mb-5 naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Title of Image*</label>
            <input
              type="text"
              className="naxatw-input"
              // id={values.id || '-'}
              name="title"
              value={values.title || ''}
              placeholder="Enter image title"
              onChange={handleChange}
            />
            {errorFields?.title && <FormErrorMessage message="Required" />}
          </div>
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Suitable Caption</label>
            <input
              type="text"
              className="naxatw-input"
              // id={values.id || '-'}
              name="caption"
              value={values.caption || ''}
              placeholder="Enter suitable caption"
              onChange={handleChange}
            />
            {errorFields?.caption && <FormErrorMessage message="Required" />}
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
