/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import UploadImage from '@Components/OrganizationDashboard/User/UploadImage/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@Utils/commonUtils';
import { checkIfLoading } from '@Utils/loaderSelector';
import Creators, { Types } from '@Actions/authentication';
import removeObjectKeys from '@Utils/removeObjectKeys';

// const initialState = {
//   profile: '',
//   firstName: '',
//   lastName: '',
//   userRole: '',
//   phone: '',
//   email: '',
// };

const ProfileSettings = () => {
  const profile = useSelector(state => state.authentication.settings.profile);
  const dispatch = useDispatch();
  const { updateUserRequest } = Creators;

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

  const {
    meta,
    setValues,
    values,
    handleChange,
    handleCustomChange,
    handleSubmit,
  } = useForm({
    initialValues: profile,
    required: ['full_name', 'contact'],
    onSubmit: data => {
      const finalObj = data;
      const diffObj = diffObject(profile, finalObj);
      const payloadData = diffObj?.image?.existedData
        ? removeObjectKeys(diffObj, ['image'])
        : diffObj;

      dispatch(updateUserRequest(profile.id, payloadData));
    },
  });

  useEffect(() => {
    if (isEmpty(profile)) return null;
    return setValues(profile);
  }, [profile, setValues]);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_USER_REQUEST]),
  );
  // console.log('form values ', values);

  return (
    <div className="naxatw-mt-7">
      <div className="naxatw-space-y-7 naxatw-mb-10">
        <UploadImage
          uploadedFile={values?.image}
          setuploadedFile={file => {
            handleCustomChange('image', file);
          }}
        />

        <Input
          label="Full Name"
          placeholder="Full Name"
          name="full_name"
          onChange={handleChange}
          value={values.full_name}
        />
        {meta.full_name.error && meta.full_name.touched && (
          <FormErrorMessage message="Name is required" />
        )}

        <Input
          label="Role of User *"
          placeholder="Role of User"
          name="roles"
          className="naxatw-bg-grey-100 naxatw-text-grey-400"
          disabled
          onChange={handleChange}
          value={values?.roles?.join()}
        />
        <Input
          label="Phone*"
          placeholder="User's Phone Number*"
          name="contact"
          onChange={handleChange}
          value={values.contact}
        />
        {meta.contact.error && meta.contact.touched && (
          <FormErrorMessage message="Contact no is required" />
        )}

        <Input
          label="Email"
          placeholder="example@example.com"
          name="email"
          className="naxatw-bg-grey-100 naxatw-text-grey-400"
          disabled
          onChange={handleChange}
          value={values.email}
        />
      </div>
      <div className="naxatw-flex naxatw-justify-center ">
        <Button
          isLoading={loading}
          className="naxatw-btn-primary  naxatw-w-[4.563rem]"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
