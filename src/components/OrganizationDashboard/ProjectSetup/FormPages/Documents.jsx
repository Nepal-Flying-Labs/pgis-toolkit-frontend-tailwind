/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { format } from 'date-fns';

const { setIndividualProject } = Creators;

const Documents = ({ page, setPage }) => {
  const dispatch = useDispatch();
  const individualProject = useSelector(
    state => state.organizationDashboard.individualProject.pageThree,
  );

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: individualProject,
    onSubmit: data =>
      dispatch(setIndividualProject({ key: 'pageThree', value: data })),
  });

  return (
    <>
      <div className="naxatw-px-[5.313rem] naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-center ">
          You can add any sort of relevant documents to the project. It includes
          relevant report, findings etc. in file format DOCX, PDF, Excel or CSV.
        </span>
      </div>

      <Input
        type="text"
        label="Title of Document"
        name="document_title"
        value={values.document_title}
        onChange={handleChange}
        placeholder="Enter title of document"
      />
      <Input
        type="text"
        label="About the document"
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Write a short description about document"
      />

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Documents</label>
        <UploadPhotos
          multiple
          label="Logo"
          uploadedFile={values?.documents}
          accept="image/*"
          onChange={images => {
            handleCustomChange('documents', images);
          }}
        />
      </div>
      <div className="naxatw-space-y-2 ">
        <label className="naxatw-label">Created Date</label>
        <CustomCalendar
          startDate={new Date()}
          onChange={date => {
            handleCustomChange('created_date', format(date, 'yyyy-MM-dd'));
          }}
          selected={values.created_date}
        />
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

export default Documents;
