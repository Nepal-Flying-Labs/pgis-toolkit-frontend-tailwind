import React from 'react';
import { useDispatch } from 'react-redux';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';

const initialState = {
  organizationName: '',
  website: '',
  about: '',
  thematicArea: '',
  email: [],
};

export default function CreateAnOrganization() {
  const dispatch = useDispatch();
  const { values, meta, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['username', 'password'],
    onSubmit: data => {
      // dispatch(loginRequest(data));
    },
  });

  return (
    <div className="naxatw-w-[50rem]">
      <div className="naxatw-mb-10 naxatw-space-y-8">
        <div className="">
          <label className="naxatw-w-full naxatw-text-left">
            Name of Organization
          </label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="organizationName"
            placeholder="Enter name of organization"
            value={values.organizationName}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="">
          <label className="naxatw-w-full naxatw-text-left">Website</label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="website"
            placeholder="example.com"
            value={values.website}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="">
          <label className="naxatw-w-full naxatw-text-left">About</label>
          <textarea
            type="text"
            className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="about"
            placeholder="About the organization"
            value={values.about}
            onChange={handleChange}
            {...inputProps}
          />
        </div>
        <div className="">
          <label className="naxatw-w-full naxatw-text-left">
            Thematic Area
          </label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="thematicArea"
            placeholder="Choose"
            value={values.thematicArea}
            onChange={handleChange}
            {...inputProps}
          />
        </div>
        <div className="">
          <label className="naxatw-w-full naxatw-text-left">Email Invite</label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="email"
            placeholder="Enter email address to invite organization admin"
            value={values.email}
            onChange={handleChange}
            {...inputProps}
          />
        </div>
      </div>

      <div className=" naxatw-mt-4 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-mt-12"
          // onClick={handleSubmit}
        >
          Invite & Save
        </Button>
      </div>
    </div>
  );
}
