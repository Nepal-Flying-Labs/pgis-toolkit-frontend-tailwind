/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/organizations';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import Input from '@Components/common/Input/index';
import Select from '@Components/common/Select/index';
import { checkIfLoading } from '@Utils/loaderSelector';

const { createOrganizationRequest } = Creators;

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

const initialState = {
  organizationName: '',
  website: '',
  about: '',
  thematicArea: '',
  email: '',
};

export default function CreateAnOrganization() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.CREATE_ORGANIZATION_REQUEST]),
  );
  const {
    values,
    meta,
    inputProps,
    handleChange,
    handleCustomChange,
    handleSubmit,
  } = useForm({
    initialValues: initialState,
    required: ['organizationName'],
    onSubmit: data => {
      if (Object.keys(emailList).length > 0) {
        const payload = {
          organization_name: data.organizationName,
          email: emailList.map(e => e.value),
        };
        dispatch(createOrganizationRequest(payload));
      } else {
        setEmailError(true);
      }
    },
  });

  return (
    <div className="">
      <div className="naxatw-p-4 naxatw-space-y-7">
        <Input
          label="Name of Organization"
          type="text"
          name="organizationName"
          placeholder="Enter name of organization"
          value={values.organizationName}
          onChange={handleChange}
          {...inputProps}
        />
        {meta.organizationName.error && meta.organizationName.touched && (
          <span className="naxatw--mt-[10px] naxatw-text-red-500">
            Required field
          </span>
        )}

        <Input
          label="Website"
          type="text"
          name="website"
          placeholder="example.com"
          value={values.website}
          onChange={handleChange}
          {...inputProps}
        />

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

        {/* <div className="naxatw-space-y-2">
          <label className="naxatw-label">Thematic Focus Area*</label>
          <Select
            options={options}
            dataKey="name"
            placeholder="Choose"
            onChange={data => {
              handleCustomChange('thematicAreas', data.name);
            }}
            selected={values.thematicAreas}
          />
        </div> */}

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
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (email) {
                    setEmailList(prev => [
                      ...prev,
                      {
                        id: Math.floor(Math.random() * 100),
                        value: email,
                      },
                    ]);
                    setEmail('');
                    setEmailError(false);
                  }
                }
              }}
              {...inputProps}
            />
            <a
              type="submit"
              className="naxatw-text-2xl naxatw-ml-2 naxatw-cursor-pointer naxatw-select-none"
              onClick={() => {
                if (values.email) {
                  setEmailList(prev => [
                    ...prev,
                    {
                      id: Math.floor(Math.random() * 100),
                      value: email,
                    },
                  ]);
                  setEmail('');
                  setEmailError(false);
                }
              }}
            >
              <i className="material-icons naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3">
                add_circle_outline
              </i>
            </a>
          </div>
          {emailError && (
            <span className="naxatw--mt-[10px] naxatw-text-red-500">
              Please add email
            </span>
          )}
          <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
            {emailList.map(item => (
              <div
                key={item.id}
                className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-gap-x-2 naxatw-rounded-3xl naxatw-bg-[#D7D7D7] naxatw-px-3 naxatw-py-[7px]"
              >
                <p className="naxatw-text-[#484848]">{item.value}</p>

                <i
                  className="material-icons naxatw-text-lg naxatw-text-[#484848] naxatw-cursor-pointer"
                  onClick={() => {
                    setEmailList(emailList.filter(e => e.id !== item.id));
                  }}
                >
                  close
                </i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Invite & Save
        </Button>
      </div>
    </div>
  );
}
