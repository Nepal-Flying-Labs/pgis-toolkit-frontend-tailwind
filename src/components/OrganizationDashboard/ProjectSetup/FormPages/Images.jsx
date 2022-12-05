/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';

const { setIndividualProject } = Creators;

const Images = ({ page, setPage }) => {
  const dispatch = useDispatch();
  const individualProject = useSelector(
    state => state.organizationDashboard.individualProject.pageFour,
  );

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: individualProject,
    onSubmit: data =>
      dispatch(setIndividualProject({ key: 'pageFour', value: data })),
  });

  return (
    <>
      <div className="naxatw-px-[5.313rem] naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-center ">
          You can add any sort of relevant photographs and images or maps, in
          file format JPEG, PNG, GIF or PDF.
        </span>
      </div>
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Images</label>
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

      <div className="naxatw-relative">
        <Input
          label="Tags "
          type="text"
          name="tag"
          value={values.tag}
          onChange={handleChange}
          placeholder="Add your own tags"
        />
        <a
          onClick={() => {
            handleCustomChange('tags', [...values.tags, values.tag]);
          }}
        >
          <MaterialIcon
            name="add_circle_outline"
            className="naxatw-absolute naxatw-top-11 naxatw-right-2 naxatw-text-[#00A699] naxatw-cursor-pointer"
          />
        </a>
        <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
          {values?.tags?.map(item => (
            <div
              key={item}
              className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-gap-x-2 naxatw-rounded-3xl naxatw-bg-[#D7D7D7] naxatw-px-3 naxatw-py-[7px]"
            >
              <p className="naxatw-text-[#484848]">{item}</p>

              <i className="material-icons naxatw-text-lg naxatw-text-[#484848] naxatw-cursor-pointer">
                close
              </i>
            </div>
          ))}
        </div>
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
        label="Suitable Caption"
        name="caption"
        value={values.caption}
        onChange={handleChange}
        placeholder="Write a Suitable Caption"
      />

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
          onClick={() => {}}
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

export default Images;
