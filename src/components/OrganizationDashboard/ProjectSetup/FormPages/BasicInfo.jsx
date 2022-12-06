/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select';
import { Creators } from '@Actions/organizationDashboard';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import Button from '@Components/common/Button';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import useForm from '@Hooks/useForm';
import { format } from 'date-fns';
import ContactPerson from './ContactPerson';

const { setIndividualProject, toggleModal } = Creators;

const thematicFocusArea = [
  {
    id: 1,
    value: 'Climate change and Energy',
    displayName: 'Climate change and Energy',
  },
];

const BasicInfo = ({ setPage }) => {
  const dispatch = useDispatch();
  const stepOne = useSelector(
    state => state.organizationDashboard.individualProject.stepOne,
  );
  const [partner, setPartner] = useState('');
  const handlePartner = e => {
    setPartner(e.target.value);
  };

  const { values, setValues, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: stepOne,
      required: ['name'],
      onSubmit: data => {
        dispatch(setIndividualProject({ key: 'stepOne', value: data }));
      },
    });
  useEffect(() => {
    setValues(stepOne);
  }, [setValues, stepOne]);

  const handleKeyChange = e => {
    if (e.key === 'Enter' && partner) {
      handleCustomChange('partners', [
        ...values.partners,
        { value: partner, id: Math.floor(Math.random() * 100) },
      ]);
      setPartner('');
    }
  };

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
        value={values?.name}
        onChange={handleChange}
        placeholder="Enter name of project"
      />

      <Input
        type="textarea"
        label="Project Objectives"
        className="naxatw-h-[77px] naxatw-pb-8"
        name="description"
        value={values?.description || ''}
        onChange={handleChange}
        placeholder="Write a short summary of a project"
      />
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Cover Image</label>
        <UploadPhotos
          multiple
          label="coverImage"
          uploadedFile={values?.coverImage}
          accept="image/*"
          onChange={images => {
            handleCustomChange('coverImage', images);
          }}
        />
      </div>

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Thematic Focus Area*</label>
        <Select
          options={thematicFocusArea}
          dataKey="displayName"
          placeholder="Choose"
          onChange={data => {
            handleCustomChange('thematic_areas', [data.value]);
          }}
          selected={values?.thematic_areas || 'Choose'}
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
            selected={values?.start_date}
          />
        </div>

        <div className="naxatw-space-y-2 naxatw-w-[325px]">
          <label className="naxatw-label">End Date</label>
          <CustomCalendar
            startDate={new Date()}
            onChange={date => {
              handleCustomChange('end_date', format(date, 'yyyy-MM-dd'));
            }}
            selected={values?.end_date}
          />
        </div>
      </div>
      <div className="naxatw-relative naxatw-space-y-2">
        <label className="naxatw-label">Partners</label>
        <input
          className="naxatw-input"
          value={partner}
          onChange={e => handlePartner(e)}
          onKeyDown={e => handleKeyChange(e)}
        />
        <a
          onClick={() => {
            handleCustomChange('partners', [
              ...values?.partners,
              { value: partner, id: Math.floor(Math.random() * 100) },
            ]);
            setPartner('');
          }}
        >
          <MaterialIcon
            name="add_circle_outline"
            className="naxatw-absolute naxatw-top-11 naxatw-right-2 naxatw-text-[#00A699] naxatw-cursor-pointer"
          />
        </a>
        <ul className="naxatw-mt-2">
          {values?.partners?.map(item => (
            <li
              key={item.id}
              className="naxatw-flex naxatw-p-3 naxatw-items-center naxatw-justify-between hover:naxatw-bg-gray-200"
            >
              <span className="naxatw-text-body-lg">{item.value}</span>
              <a
                onClick={() => {
                  const updatedArray = values?.partners?.filter(
                    list => list.id !== item.id,
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
      <ContactPerson />
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
          onClick={() => {
            handleSubmit();
            dispatch(toggleModal('save-as-draft'));
          }}
          className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-border-[1px] hover:naxatw-underline hover:naxatw-bg-grey-200"
        >
          Save as Draft
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
