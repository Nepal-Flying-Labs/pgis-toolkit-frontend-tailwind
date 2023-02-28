/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/organizations';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import Input from '@Components/common/Input/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import CustomInput from '@Components/common/CustomInput/index';

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
  const [emailList, setEmailList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.CREATE_ORGANIZATION_REQUEST]),
  );

  const { height } = useWindowDimensions();
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
    <div>
      <div
        className="naxatw-px-4 naxatw-pb-4 naxatw-space-y-7 naxatw-overflow-y-auto scrollbar
          naxatw-max-h-[calc(100vh-19rem)]"
      >
        <Input
          label="Name of Organization *"
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

        {/* <Input
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
            className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white focus:naxatw-border-gray-600 focus:naxatw-outline-none"
            name="about"
            placeholder="About the organization"
            value={values.about}
            onChange={handleChange}
            {...inputProps}
          />
        </div> */}

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

        <CustomInput
          emailList={emailList}
          setEmailList={setEmailList}
          emailError={emailError}
          setEmailError={setEmailError}
        />
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary naxatw-w-[128px]"
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
