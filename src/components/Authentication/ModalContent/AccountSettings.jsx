/* eslint-disable no-unused-vars */
import React from 'react';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';

const initialState = {
  profile: '',
  firstName: '',
  lastName: '',
  userRole: '',
  phone: '',
  email: '',
};

const AccountSettings = () => {
  const { meta, values, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: initialState,
      onSubmit: data => {},
    });
  return <div className="naxatw-mt-7">account</div>;
};

export default AccountSettings;
