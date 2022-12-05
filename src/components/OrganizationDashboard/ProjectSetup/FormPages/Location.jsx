/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import Select from '@Components/common/Select/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import Chip from '@Components/common/Chip';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import MapSection from '../MapSection/index';
// import MaterialIcon from '@Components/common/MaterialIcon/index';
const { setIndividualProject } = Creators;

const options = [
  {
    id: 1,
    name: 'Filter 1',
  },
  {
    id: 2,
    name: 'Filter 2',
  },
  {
    id: 3,
    name: 'Filter 3',
  },
];

const Location = ({ page, setPage }) => {
  const [geographicToggle, handleGeographicToggle] = useState('Upload Area');
  const dispatch = useDispatch();
  const individualProject = useSelector(
    state => state.organizationDashboard.individualProject.pageTwo,
  );

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: individualProject,
    onSubmit: data =>
      dispatch(setIndividualProject({ key: 'pageTwo', value: data })),
  });

  return (
    <>
      <div className="naxatw-px-[5.313rem] naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-center ">
          Select the location boundary for the area you are working. You can
          either manually draw the boundary for the project site or you can
          upload a location data to define the boundary areas
        </span>
      </div>
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Country</label>
        <Select
          options={options}
          defaultValue="Choose"
          onChange={data => {
            handleCustomChange('country', data.name);
          }}
          selected={values.country}
          dataKey="name"
        />
      </div>

      <Input
        type="text"
        label="Name of Geographical Region"
        name="geographical_region"
        value={values.geographical_region}
        onChange={handleChange}
        placeholder="Enter name of Geographical Region"
      />

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Choose the Geographic Boundary</label>
        <div className="naxatw-flex naxatw-gap-x-2">
          <Chip
            name="Upload Area"
            status={values.location_type}
            value="Upload Area"
            onClick={() => {
              handleCustomChange('location_type', 'Upload Area');
            }}
          />
          <Chip
            name="Draw Area on Map"
            status={values.location_type}
            value="Custom Draw"
            onClick={() => {
              handleCustomChange('location_type', 'Custom Draw');
            }}
          />
        </div>
      </div>
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Polygon Boundary</label>
        <UploadPhotos
          isDropzone={false}
          multiple
          label="Logo"
          uploadedFile={values?.logo}
          accept="image/*"
          onChange={images => {
            handleCustomChange('logo', images);
          }}
        />
        <MapSection />
      </div>

      <div className="naxatw-flex naxatw-justify-between  naxatw-pt-7 naxatw-pb-7 ">
        {page > 1 ? (
          <Button
            iconLeft="arrow_back"
            className=" naxatw-w-[8.875rem] naxatw-text-[#00A699] "
            onClick={() => {
              handleSubmit();
              setPage(prevPage => prevPage - 1);
            }}
          >
            Go back
          </Button>
        ) : (
          <div />
        )}
        <Button
          className="naxatw-btn-primary naxatw-w-[4.75rem]"
          onClick={() => {
            // handleSubmit();
            // setPage(prevPage => prevPage + 1);
          }}
        >
          Save
        </Button>
        <Button
          // onClick={handleSubmit}
          className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-border-[1px] hover:naxatw-underline hover:naxatw-bg-grey-200"
        >
          Save as Draft
        </Button>
      </div>
    </>
  );
};

export default Location;
