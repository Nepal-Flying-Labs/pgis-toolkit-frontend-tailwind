import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';

const initialState = {
  uploadedFile: null,
  layerName: '',
};

export default function AddLayer() {
  const selectedProjectTheme = useSelector(
    state => state.projectDashboard.selectedProjectTheme,
  );
  const dispatch = useDispatch();
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['uploadedFile', 'layerName'],
    onSubmit: data => {
      console.log(data, 'datax');
    },
  });

  return (
    <div>
      <div className="mb-6 naxatw-space-y-[1.125rem]">
        <div>
          <label className="naxatw-label">Upload Vector</label>
          <input
            type="file"
            name="uploadedFile"
            className="naxatw-input"
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-space-y-2 naxatw-relative">
          <label className="naxatw-label">Theme</label>
          <input
            type="text"
            className="naxatw-input"
            name="theme"
            placeholder="Theme"
            value={selectedProjectTheme.name}
            disabled
          />
        </div>
        <div className="naxatw-space-y-2 naxatw-relative">
          <label className="naxatw-label">Layer Name</label>
          <input
            type="text"
            className="naxatw-input"
            name="layerName"
            placeholder="Layer Name"
            value={values.layerName}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button className="naxatw-btn-primary" onClick={handleSubmit}>
            Add To Map
          </Button>
        </div>
      </div>
    </div>
  );
}
