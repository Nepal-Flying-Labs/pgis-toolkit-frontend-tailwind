/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select';
import { Creators } from '@Actions/organizationDashboard';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { format } from 'date-fns';

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

const BasicInfo = ({ setPage }) => {
  const dispatch = useDispatch();
  const individualProject = useSelector(
    state => state.organizationDashboard.individualProject.pageOne,
  );

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: individualProject,
    onSubmit: data => {
      dispatch(setIndividualProject({ key: 'pageOne', value: data }));
    },
  });
  const [projectPartners, setProjectPartners] = useState([]);
  const [thematicFilter, setThematicFilter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // if (Object.keys(individualProject).length > 0) {
  //   setStartDate(individualProject?.start_date);
  //   setEndDate(individualProject?.end_date);
  //   setProjectPartners(individualProject?.partners);
  // }
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
        <Select
          options={options}
          dataKey="name"
          defaultValue="Choose"
          onChange={data => {
            handleCustomChange('thematic_areas', data.name);
          }}
          selected={values.thematic_areas}
        />
      </div>

      <div className="naxatw-flex naxatw-justify-between">
        <div className="naxatw-space-y-2 naxatw-w-[325px]">
          <label className="naxatw-label">Start Date</label>
          <CustomCalendar
            startDate={new Date()}
            onChange={date => {
              handleCustomChange('start_date', format(date, 'yyyy-MM-dd'));
            }}
            selected={values.start_date}
          />
        </div>

        <div className="naxatw-space-y-2 naxatw-w-[325px]">
          <label className="naxatw-label">Start Date</label>
          <CustomCalendar
            startDate={new Date()}
            onChange={date => {
              handleCustomChange('end_date', format(date, 'yyyy-MM-dd'));
            }}
            selected={values.end_date}
          />
        </div>
      </div>
      <div className="naxatw-relative">
        <Input
          label="Project Partners "
          type="text"
          name="partner"
          value={values.partner}
          onChange={handleChange}
          placeholder="Enter name of Project Partners"
        />
        <a
          onClick={() => {
            // setProjectPartners(prev => [...prev, values.partners]);
            handleCustomChange('partners', [
              ...values.partners,
              values.partner,
            ]);
          }}
        >
          <MaterialIcon
            name="add_circle"
            className="naxatw-absolute naxatw-top-11 naxatw-right-2 naxatw-text-[#00A699] naxatw-cursor-pointer"
          />
        </a>
        <ul className="naxatw-mt-2">
          {values?.partners?.map(item => (
            <li
              key={item}
              className="naxatw-flex naxatw-p-3 naxatw-items-center naxatw-justify-between hover:naxatw-bg-gray-200"
            >
              <span className="naxatw-text-body-lg">{item}</span>
              <a
                onClick={() => {
                  const updatedArray = values?.partners?.filter(
                    list => list !== item,
                  );
                  handleCustomChange('partners', updatedArray);
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
      <div className="naxatw-flex naxatw-justify-between  naxatw-pt-7 naxatw-pb-7 ">
        <div />

        <Button
          className="naxatw-btn-primary naxatw-w-[4.75rem]"
          onClick={() => {
            handleSubmit();
            setPage(prevPage => prevPage + 1);
          }}
        >
          Next
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

export default BasicInfo;
