/* eslint-disable no-unused-vars */
import React from 'react';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import UploadImage from '../User/UploadImage/index';

const initialState = {
  profile: '',
  firstName: '',
  lastName: '',
  userRole: '',
  phone: '',
  email: '',
};

const CreateNewUser = () => {
  const { meta, values, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: initialState,
      onSubmit: data => {},
    });
  return (
    <div className="naxatw-mt-7">
      <div className="naxatw-space-y-7 naxatw-mb-10">
        <UploadImage
          uploadedFile={values?.profile}
          setuploadedFile={file => {
            handleCustomChange('profile', file);
          }}
        />
        <div className="naxatw-flex naxatw-gap-x-5">
          <div className="naxatw-basis-1/2">
            <Input
              label="First Name"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
            />
          </div>
          <div className="naxatw-basis-1/2">
            <Input
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
            />
          </div>
        </div>

        <Input
          label="Role of User *"
          placeholder="Role of User"
          name="userRole"
          onChange={handleChange}
          value={values.userRole}
        />
        <Input
          label="Phone*"
          placeholder="User's Phone Number*"
          name="phone"
          onChange={handleChange}
          value={values.phone}
        />
        <Input
          label="Email"
          placeholder="example@example.com"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
      </div>
      <div className="naxatw-flex naxatw-justify-center ">
        <Button className="naxatw-btn-primary  naxatw-w-[4.563rem]">
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateNewUser;
