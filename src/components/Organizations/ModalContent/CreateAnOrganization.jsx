import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/organizations';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';

const { createOrganizationRequest } = Creators;

const initialState = {
  organizationName: '',
  website: '',
  about: '',
  thematicArea: '',
  email: '',
};

export default function CreateAnOrganization() {
  const dispatch = useDispatch();
  const [emailList, setEmailList] = useState([]);
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['organizationName'],
    onSubmit: data => {
      const payload = {
        organization_name: data.organizationName,
        email: emailList,
      };
      dispatch(createOrganizationRequest(payload));
    },
  });

  return (
    <div className="">
      <div className="naxatw-p-4 naxatw-space-y-7">
        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            Name of Organization
          </label>
          <input
            type="text"
            className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
            name="organizationName"
            placeholder="Enter name of organization"
            value={values.organizationName}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            Website
          </label>
          <input
            type="text"
            className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
            name="website"
            placeholder="example.com"
            value={values.website}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            About
          </label>
          <textarea
            type="text"
            className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
            name="about"
            placeholder="About the organization"
            value={values.about}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            Thematic Area
          </label>
          <input
            type="text"
            className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
            name="thematicArea"
            placeholder="Choose"
            value={values.thematicArea}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            Email Invite
          </label>
          <div className="naxatw-flex naxatw-items-center naxatw-relative">
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="email"
              placeholder="Enter email address to invite organization admin"
              value={values.email}
              onChange={handleChange}
              {...inputProps}
            />
            <a
              type="submit"
              className="naxatw-text-2xl naxatw-ml-2 naxatw-cursor-pointer naxatw-select-none"
              onClick={() => {
                setEmailList(prev => [...prev, values.email]);
              }}
            >
              <i className="material-icons naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3">
                add_circle_outline
              </i>
            </a>
          </div>
          <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
            {emailList.map(item => (
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
      </div>

      <div className=" naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button className="naxatw-btn-primary" onClick={handleSubmit}>
          Invite & Save
        </Button>
      </div>
    </div>
  );
}
