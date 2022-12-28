/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select/index';
import Button from '@Components/common/Button/index';
import useForm from '@Hooks/useForm';

const initialState = {
  name: '',
  alias: '',
  type: '',
  source: '',
};

const type = [
  {
    id: 1,
    name: 'text',
    displayName: 'Text',
  },
  {
    id: 2,
    name: 'integer',
    displayName: 'Integer',
  },
  {
    id: 3,
    name: 'float',
    displayName: 'Float',
  },
];

const source = [
  {
    id: 1,
    name: 'osm',
    displayName: 'OSM',
  },
  {
    id: 2,
    name: 'usafiri',
    displayName: 'USAFIRI',
  },
  {
    id: 3,
    name: 'custom',
    displayName: 'Custom',
  },
];

const AddAttributes = () => {
  const { values, handleChange, handleSubmit, handleCustomChange } = useForm({
    initialValues: initialState,
    onSubmit: data => {},
  });
  return (
    <div className="naxatw-container ">
      <div className="naxatw-w-[41.875rem] naxatw-mx-auto naxatw-px-7 naxatw-py-5">
        <div className="naxatw-space-y-5">
          <Input
            label="Attribute"
            placeholder="Enter Attribute Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <Input
            label="Alias"
            placeholder="Enter alias"
            name="alias"
            value={values.alias}
            onChange={handleChange}
          />
          <div className="naxatw-flex naxatw-gap-x-5">
            <div className="naxatw-basis-2/4 naxatw-space-y-2">
              <label className="naxatw-text-body-btn">Type</label>
              <Select
                placeholder="Choose"
                options={type}
                dataKey="displayName"
                onChange={data => {
                  handleCustomChange('type', data.name);
                }}
                selected={
                  type.filter(t => t.name === values.type)?.[0]?.displayName
                }
              />
            </div>
            <div className="naxatw-basis-2/4 naxatw-space-y-2">
              <label className="naxatw-text-body-btn">Source</label>
              <Select
                placeholder="Choose"
                options={source}
                dataKey="displayName"
                onChange={data => {
                  handleCustomChange('source', data.name);
                }}
                selected={
                  source.filter(s => s.name === values.source)?.[0]?.displayName
                }
              />
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
