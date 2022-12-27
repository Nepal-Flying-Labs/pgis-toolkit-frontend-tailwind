/* eslint-disable arrow-body-style */
import React from 'react';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select/index';
import Button from '@Components/common/Button/index';

const AddAttributes = () => {
  return (
    <div className="naxatw-container ">
      <div className="naxatw-w-[41.875rem] naxatw-mx-auto naxatw-px-7 naxatw-py-5">
        <div className="naxatw-space-y-5">
          <Input label="Attribute" placeholder="Enter Attribute Name" />
          <Input label="Attribute" placeholder="Enter Attribute Name" />
          <div className="naxatw-flex naxatw-gap-x-5">
            <div className="naxatw-basis-2/4 naxatw-space-y-2">
              <label className="naxatw-text-body-btn">Type</label>
              <Select placeholder="Choose" />
            </div>
            <div className="naxatw-basis-2/4 naxatw-space-y-2">
              <label className="naxatw-text-body-btn">Type</label>
              <Select placeholder="Choose" />
            </div>
          </div>
        </div>
        <div className="naxatw-flex naxatw-justify-center">
          <Button className="naxatw-btn-primary naxatw-mt-10">Add</Button>
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
