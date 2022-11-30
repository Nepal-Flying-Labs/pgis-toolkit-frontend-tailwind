/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select';
import MaterialIcon from '@Components/common/MaterialIcon/index';

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

const BasicInfo = ({ values, handleChange }) => {
  const [projectPartners, setProjectPartners] = useState([]);
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
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter name of project"
      />

      <Input
        type="textarea"
        label="Project Objectives"
        className="naxatw-h-[77px] naxatw-pb-8"
        name="description"
        value={values.description || ''}
        onChange={handleChange}
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
          name="start_date"
          value={values.start_date}
          onChange={handleChange}
          placeholder="Choose"
        />

        <Input
          type="date"
          className="naxatw-w-[325px]"
          label="End Date"
          name="end_date"
          value={values.end_date}
          onChange={handleChange}
          placeholder="Choose"
        />
      </div>
      <div className="naxatw-relative">
        <Input
          label="Project Partners "
          type="text"
          name="partners"
          value={values.partners}
          onChange={handleChange}
          placeholder="Enter name of Project Partners"
        />
        <a
          onClick={() => {
            setProjectPartners(prev => [...prev, values.partners]);
          }}
        >
          <MaterialIcon
            name="add_circle"
            className="naxatw-absolute naxatw-top-11 naxatw-right-2 naxatw-text-[#00A699] naxatw-cursor-pointer"
          />
        </a>
        <ul className="naxatw-mt-2">
          {projectPartners.map(item => (
            <li
              key={item}
              className="naxatw-flex naxatw-p-3 naxatw-items-center naxatw-justify-between hover:naxatw-bg-gray-200"
            >
              <span className="naxatw-text-body-lg">{item}</span>
              <a
                onClick={() => {
                  const updatedArray = projectPartners.filter(
                    list => list !== item,
                  );
                  setProjectPartners(updatedArray);
                }}
              >
                <MaterialIcon name="close" className="naxatw-cursor-pointer" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      <h4>Contact Person Details</h4>
      <Input
        type="text"
        label="Name of contact Person"
        name="contact_name"
        value={values.contact_name}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <Input
        label="Position"
        type="text"
        name="position"
        value={values.position}
        onChange={handleChange}
        placeholder="Position"
      />

      <Input
        type="email"
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="example.com"
      />

      <Input
        label="Phone"
        type="text"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="Phone Number"
      />
    </>
  );
};

export default BasicInfo;
