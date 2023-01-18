/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select/index';
import Button from '@Components/common/Button/index';
import { Creators, Types } from '@Actions/projectDashboard';
import { checkIfLoading } from '@Utils/loaderSelector';
import useForm from '@Hooks/useForm';

const {
  postTemplateAttributeRequest,
  clearIndividualAttribute,
  updateTemplateAttributeRequest,
} = Creators;

const initialState = {
  name: '',
  alias: '',
  data_type: '',
  source: '',
};

const type = [
  {
    id: 1,
    name: 'str',
    displayName: 'String',
  },
  {
    id: 2,
    name: 'int',
    displayName: 'Integer',
  },
  {
    id: 3,
    name: 'float',
    displayName: 'Float',
  },
  {
    id: 4,
    name: 'date',
    displayName: 'Date',
  },
];

const source = [
  // {
  //   id: 1,
  //   name: 'osm',
  //   displayName: 'OSM',
  // },
  // {
  //   id: 2,
  //   name: 'usafiri',
  //   displayName: 'USAFIRI',
  // },
  {
    id: 3,
    name: 'custom',
    displayName: 'Custom',
  },
];

const AddAttributes = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.POST_TEMPLATE_ATTRIBUTE_REQUEST,
      Types.UPDATE_TEMPLATE_ATTRIBUTE_REQUEST,
    ]),
  );
  const individualAttribute = useSelector(
    state => state.projectDashboard.data.manageData.individualAttribute,
  );
  const { values, handleChange, handleSubmit, handleCustomChange } = useForm({
    initialValues: individualAttribute || initialState,
    onSubmit: data => {
      if (individualAttribute) {
        dispatch(
          updateTemplateAttributeRequest(individualAttribute.id, { ...values }),
        );
      } else {
        dispatch(
          postTemplateAttributeRequest({
            ...values,
            data_type: values.type,
            layer_template: selectedData.id,
          }),
        );
      }
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearIndividualAttribute());
    };
  }, [dispatch]);

  return (
    <div className="naxatw-container ">
      <div className="naxatw-w-[41.875rem] naxatw-mx-auto naxatw-px-7 naxatw-py-5">
        <div className="naxatw-space-y-5">
          <Input
            label="Attribute"
            placeholder="Enter Attribute Name"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
          />
          <Input
            label="Alias"
            placeholder="Enter alias"
            name="alias"
            value={values.alias || ''}
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
                  handleCustomChange('data_type', data.name);
                }}
                selected={
                  type.filter(t => t.name === values.data_type)?.[0]
                    ?.displayName
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
                selected={source.filter(s => s.id === 3)?.[0]?.displayName}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="naxatw-flex naxatw-justify-center">
          <Button
            className="naxatw-btn-primary naxatw-mt-10"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
            onClick={handleSubmit}
          >
            {individualAttribute ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
