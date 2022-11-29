/* eslint-disable arrow-body-style */
import React from 'react';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select';

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

const BasicInfo = () => {
  return (
    <>
      <div className="naxatw-px-[5.313rem] naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-center ">
          As a user you cannot proceed forward with the basic setup.Fill up the
          basic info form to proceed ahead
        </span>
      </div>

      <Input
        type="text"
        label="Name of project*"
        name="project_name"
        placeholder="Enter name of project"
      />

      <Input
        type="textarea"
        label="Project Objectives"
        className="naxatw-h-[77px] naxatw-pb-8"
        name="project_objectives"
        placeholder="Write a short summary of a project"
      />

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Thematic Focus Area*</label>
        <Select options={options} defaultValue="Choose" />
      </div>

      <div className="naxatw-flex naxatw-justify-between">
        <Input
          type="date"
          className="naxatw-w-[325px] naxatw-mr-5"
          label="Start Date"
          name="thematic_focus_area"
          placeholder="Choose"
        />

        <Input
          type="date"
          className="naxatw-w-[325px]"
          label="End Date"
          name="thematic_focus_area"
          placeholder="Choose"
        />
      </div>

      <Input
        label="Project Partners "
        type="select"
        name="thematic_focus_area"
        placeholder="Enter name of Project Partners"
        hasAddIcon
      />

      <hr />
      <h4>Contact Person Details</h4>
      <Input
        type="select"
        label="Name of contact Person"
        name="thematic_focus_area"
        placeholder="Full Name"
      />

      <Input
        label="Position"
        type="select"
        name="thematic_focus_area"
        placeholder="Position"
      />

      <Input
        type="select"
        label="Email"
        name="thematic_focus_area"
        placeholder="example.com"
      />

      <Input
        label="Phone"
        type="select"
        name="thematic_focus_area"
        placeholder="Phone Number"
      />
    </>
  );
};

export default BasicInfo;
