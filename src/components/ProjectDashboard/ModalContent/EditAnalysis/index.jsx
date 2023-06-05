import Input from '@Components/common/Input/index';
import React, { useState } from 'react';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import Button from '@Components/common/Button/index';

const index = () => {
  const [test, setTest] = useState('');
  return (
    <>
      <div className="naxatw-space-y-3">
        <div>
          <Input
            label="Name*"
            placeholder="Name"
            name="name"
            // value={values.name}
            // onChange={handleChange}
          />
          {/* {meta.name.error && meta.name.touched && (
            <FormErrorMessage message="Name is required" />
          )} */}
        </div>
        <div>
          <Input
            label="Description*"
            placeholder="Description"
            name="description"
            // value={values.name}
            // onChange={handleChange}
          />
          {/* {meta.name.error && meta.name.touched && (
            <FormErrorMessage message="Name is required" />
          )} */}
        </div>
        <div className="naxatw-flex naxatw-items-center naxatw-justify-center naxatw-py-4">
          <Button
            className="naxatw-btn-primary"
            // onClick={handleSubmit}
            // isLoading={loading}
          >
            Save
          </Button>
        </div>
      </div>
      <div />
    </>
  );
};

export default index;
