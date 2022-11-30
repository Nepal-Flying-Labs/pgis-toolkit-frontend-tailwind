/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React from 'react';
import Input from '@Components/common/Input/index';
import Select from '@Components/common/Select/index';
// import MaterialIcon from '@Components/common/MaterialIcon/index';

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

const Location = ({ values, handleChange }) => {
  return (
    <>
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
          <Select options={options} defaultValue="Choose" />
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
          <Select options={options} defaultValue="Choose" />
        </div>
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Upload Polygon Boundary</label>
          <Select options={options} defaultValue="Choose" />
        </div>
      </>
    </>
  );
};

export default Location;
