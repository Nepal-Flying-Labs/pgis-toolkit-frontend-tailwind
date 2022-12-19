import React from 'react';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';

const initialState = {
  layerName: '',
  url: '',
};

const AddWMSLayer = () => {
  const { values, handleSubmit, handleChange } = useForm({
    initialValues: initialState,
    onSubmit: data => () => {},
  });
  return (
    <div>
      <span className="naxatw-text-body-lg naxatw-text-[#484848]">
        USAFIRI allows you to do different sorts of analysis with your map
        datasets. Below are some of the analysis functions we have in the tool
        at the moment.
      </span>
      <div className="naxatw-mt-5 naxatw-space-y-5">
        <Input
          label="Layer Name"
          name="layerName"
          placeholder="Enter layer Name"
          value={values.layerName}
          onChange={handleChange}
        />
        <Input
          label="Your URL Here"
          name="url"
          placeholder="Yout URL Heree"
          value={values.url}
          onChange={handleChange}
        />
        <div className="naxatw-pt-5 naxatw-flex naxatw-justify-center">
          <Button className="naxatw-btn-primary">Add to Catalogue</Button>
        </div>
      </div>
    </div>
  );
};

export default AddWMSLayer;
