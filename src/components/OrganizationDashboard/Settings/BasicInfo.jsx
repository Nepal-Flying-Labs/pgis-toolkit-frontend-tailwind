/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input';
import MultiSelect from '@Components/common/MultiSelect/index';
import { Creators, Types } from '@Actions/organizationDashboard';
// import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import removeObjectKeys from '@Utils/removeObjectKeys';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
// import { format } from 'date-fns';
import toastActions from '@Actions/toast';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import getImageSource from '@Utils/getImageSource';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import useCustomUpload from '@Hooks/useCustomUpload';
import ContactPerson from './ContactPerson';
// import ContactPerson from './ContactPerson';

const { updateOrganizationRequest } = Creators;
// const { togglePromptDialog } = CommonCreators;

const thematicFocusArea = [
  {
    id: 1,
    value: 'Disaster Risk Reduction & Management',
    displayName: 'Disaster Risk Reduction & Management',
  },
  {
    id: 2,
    value: 'Development Planning & Management',
    displayName: 'Development Planning & Management',
  },
  {
    id: 3,
    value: 'Mobility',
    displayName: 'Mobility',
  },
  {
    id: 4,
    value: 'Climate Change & Environment',
    displayName: 'Climate Change & Environment',
  },
  {
    id: 5,
    value: 'Urban Sustainability',
    displayName: 'Urban Sustainability',
  },
];

function diffObject(a, b) {
  const diffObj = Object.keys(b).reduce((diff, key) => {
    if (a[key] === b[key]) return diff;
    return {
      ...diff,
      [key]: b[key],
    };
  }, {});
  return diffObj;
}

const BasicInfo = () => {
  const { organizationId } = useParams();
  const [inputRef, onFileUpload] = useCustomUpload();
  const [errorFields, setErrorFields] = useState([]);

  const dispatch = useDispatch();
  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );
  const settingInfo = useSelector(
    state => state.organizationDashboard.individualOrganization.item,
  );

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_ORGANIZATION_REQUEST]),
  );

  const { values, setValues, handleChange, handleCustomChange } = useForm({
    initialValues: settingInfo,
    required: ['name'],
    onSubmit: data => {},
  });

  useEffect(() => {
    setValues(settingInfo);
  }, [setValues, settingInfo]);

  const diffObj = diffObject(settingInfo, values);

  // const payloadData = diffObj?.cover_image?.existedData
  //   ? removeObjectKeys(diffObj, ['cover_image'])
  //   : diffObj;
  // dispatch(
  //   updateOrganizationRequest(organizationId, {
  //     ...payloadData,
  //   }),
  // );

  const handleSubmit = () => {
    if (loading) return;
    let errorCount = 0;
    const fields = [];
    if (!values.name) fields.push('name');
    if (fields.length) errorCount += 1;
    setErrorFields(fields);
    if (errorCount === 0) {
      dispatch(updateOrganizationRequest(organizationId, values));
    } else {
      dispatch(
        toastActions.error({
          message: 'Please fill out all the required fields.',
        }),
      );
    }
  };

  const onChangeFileUpload = e => {
    const { files } = e.target;
    const image = URL.createObjectURL(files[0]);
    files[0].image = image;
    handleCustomChange('cover_image', files[0]);
  };

  return (
    <>
      <div className="naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-start">
          As a user you cannot proceed forward with the basic setup.Fill up the
          basic info form to proceed ahead
        </span>
      </div>
      <div className="naxatw-flex naxatw-gap-x-5">
        <div className="naxatw-w-full naxatw-space-y-7">
          <Input
            type="text"
            label="Name of Organization*"
            name="name"
            value={values?.name}
            onChange={handleChange}
            placeholder="Enter name of organization"
          />
          {errorFields?.includes('name') && (
            <FormErrorMessage message="Required" />
          )}

          <Input
            type="textarea"
            label="About Organization"
            className="naxatw-h-[77px] naxatw-pb-8"
            name="description"
            value={values?.description || ''}
            onChange={handleChange}
            placeholder="Write a short summary of an organization"
          />
        </div>
        <div className="naxatw-w-32 naxatw-min-w-32">
          {/* <div className="naxatw-w-full naxatw-flex naxatw-items-center naxatw-justify-center"> */}
          <img
            src={
              values?.cover_image
                ? getImageSource(values.cover_image)
                : AvatarIcon
            }
            alt="img"
            className="naxatw-w-32 naxatw-min-w-32 naxatw-h-[6.5rem] naxatw-min-h-[6.5rem] naxatw-object-cover naxatw-border naxatw-rounded-full"
          />
          {/* </div> */}
          {/* <div className="naxatw-w-full naxatw-justify-center"> */}
          <Button
            className="naxatw-btn-secondary naxatw-w-full naxatw-mt-5"
            onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload
            </span>
          </Button>
          {/* </div> */}
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => onChangeFileUpload(e)}
          />
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-w-full naxatw-mt-1"
            onClick={() => handleCustomChange('cover_image', null)}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Remove
            </span>
          </Button>
        </div>
      </div>
      <div className="naxatw-flex naxatw-gap-x-2">
        <div className="naxatw-w-1/2">
          <Input
            type="text"
            label="Address"
            name="address"
            value={values?.address}
            onChange={handleChange}
            placeholder="address"
          />
        </div>
        <div className="naxatw-w-1/2">
          <Input
            type="text"
            label="Email"
            name="email"
            value={values?.email}
            onChange={handleChange}
            placeholder="example@example.com"
          />
        </div>
      </div>
      <div className="naxatw-flex naxatw-gap-x-2">
        <div className="naxatw-w-1/2">
          <Input
            type="text"
            label="Contact"
            name="contact"
            value={values?.contact}
            onChange={handleChange}
            placeholder="phone"
          />
        </div>
        <div className="naxatw-w-1/2">
          <Input
            type="text"
            label="Website"
            name="link"
            value={values?.link}
            onChange={handleChange}
            placeholder="example.com"
          />
        </div>
      </div>
      {/* <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Cover Image</label>
        <UploadPhotos
          label="coverImage"
          uploadedFile={values?.cover_image || []}
          accept="image/*"
          onChange={images => {
            handleCustomChange('cover_image', images);
          }}
        />
      </div> */}
      <Input
        type="text"
        label="Organization Size"
        name="size"
        value={values?.size}
        onChange={handleChange}
        placeholder="Organization size"
      />

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Thematic Focus Area*</label>
        <MultiSelect
          options={thematicFocusArea}
          placeholder="Choose"
          field="displayName"
          onChange={data => {
            const area = data.map(i => i.value);
            handleCustomChange('thematic_areas', area);
          }}
          selected={thematicFocusArea.filter(item =>
            values?.thematic_areas?.includes(item.value),
          )}
        />
      </div>
      <hr />
      <ContactPerson />

      <div className="naxatw-flex naxatw-justify-center naxatw-pb-7 naxatw-pt-7">
        <Button
          className="naxatw-btn-primary naxatw-w-[4.75rem]"
          onClick={handleSubmit}
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
