/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Input from '@Components/common/Input';
import Select from '@Components/common/Select/index';
import Button from '@Components/common/Button/index';
import { Creators, Types } from '@Actions/projectDashboard';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import { checkIfLoading } from '@Utils/loaderSelector';
import useForm from '@Hooks/useForm';
import Toggle from '@Components/common/Toggle/index';
import Spinner from '@Components/common/Spinner/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import isEmpty from '@Utils/isEmpty';

const {
  postTemplateAttributeRequest,
  clearIndividualAttribute,
  updateTemplateAttributeRequest,
} = Creators;

const {
  updateLayerAttributeFieldsRequest,
  getFieldsDropdownOptionRequest,
  setProjectMapState,
  updateDropdownOptionRequest,
} = ProjectMapCreators;

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
  {
    id: 3,
    name: 'custom',
    displayName: 'Custom',
  },
];

const AddAttributes = () => {
  const { tabname } = useParams();
  const dispatch = useDispatch();
  const selectedData = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.POST_TEMPLATE_ATTRIBUTE_REQUEST,
      Types.UPDATE_TEMPLATE_ATTRIBUTE_REQUEST,
      ProjectMapTypes.UPDATE_LAYER_ATTRIBUTE_FIELDS_REQUEST,
      ProjectMapTypes.GET_FIELDS_DROPDOWN_OPTION_REQUEST,
    ]),
  );
  // const dropdownLoading = useSelector(state =>
  //   checkIfLoading(state, [ProjectMapTypes.GET_FIELDS_DROPDOWN_OPTION_REQUEST]),
  // );
  const individualAttribute = useSelector(
    state => state.projectDashboard.data.manageData.individualAttribute,
  );
  const dropdownOptions = useSelector(
    state => state.projectMap.fieldsDropdownOptions,
  );

  const [formValues, setFormValues] = useState(dropdownOptions || {});

  useEffect(() => {
    setFormValues(dropdownOptions);
  }, [dropdownOptions]);

  const handleOptionChange = e => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  const { values, handleChange, handleSubmit, handleCustomChange } = useForm({
    initialValues: individualAttribute || initialState,
    onSubmit: data => {
      if (individualAttribute) {
        const finalPayload = diffObject(individualAttribute, values);
        if (tabname === 'manage-data') {
          dispatch(
            updateTemplateAttributeRequest(individualAttribute.id, {
              ...values,
            }),
          );
        } else {
          const diffObj = diffObject(dropdownOptions, formValues);
          if (!isEmpty(diffObj))
            dispatch(
              updateDropdownOptionRequest(individualAttribute.id, diffObj),
            );
          dispatch(
            updateLayerAttributeFieldsRequest(
              individualAttribute.id,
              finalPayload,
            ),
          );
        }
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

  const [isDropdown, setIsDropdown] = useState(
    individualAttribute?.dropdown_field ? 'yes' : 'no',
  );

  const handleDropdownChange = e => {
    setIsDropdown(e.target.value);
    dispatch(
      updateLayerAttributeFieldsRequest(individualAttribute.id, {
        dropdown_field: e.target.value === 'yes',
        isPatch: true,
      }),
    );
  };

  useEffect(() => {
    if (individualAttribute?.dropdown_field) {
      dispatch(
        getFieldsDropdownOptionRequest({ attribute: individualAttribute.id }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualAttribute]);

  useEffect(() => {
    return () => {
      dispatch(clearIndividualAttribute());
      dispatch(setProjectMapState({ fieldsDropdownOptions: null }));
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
              <label className="naxatw-label">Type</label>
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
            {tabname === 'manage-data' ? (
              <div className="naxatw-basis-1/4 naxatw-space-y-2">
                <label className="naxatw-label">Source</label>
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
            ) : (
              <div className="naxatw-basis-1/4 naxatw-space-y-2">
                <label className="naxatw-label">Mandatory</label>
                <div className="naxatw-flex naxatw-items-center naxatw-h-[40px]">
                  <Toggle
                    checked={values.mandatory}
                    onChange={() => {
                      handleCustomChange('mandatory', !values.mandatory);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="naxatw-basis-1/4 naxatw-space-y-2">
              <label className="naxatw-label">Choose</label>
              <div className="naxatw-flex naxatw-gap-x-3">
                <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                  <input
                    id="button_yes"
                    type="radio"
                    value="yes"
                    name="gender"
                    onChange={handleDropdownChange}
                    checked={isDropdown === 'yes'}
                  />
                  <label htmlFor="button_yes" className="naxatw-label">
                    Yes
                  </label>
                </div>
                <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                  <input
                    id="button_no"
                    type="radio"
                    value="no"
                    name="gender"
                    onChange={handleDropdownChange}
                    checked={isDropdown === 'no'}
                  />
                  <label htmlFor="button_no" className="naxatw-label">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {isDropdown === 'yes' && (
            <div className="naxatw-space-y-2">
              <h4>Choose Options</h4>
              <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-2">
                {formValues &&
                  Object.keys(formValues).map(option => (
                    <Input
                      key={option}
                      label={`Option ${option}`}
                      placeholder={`Option ${option}`}
                      name={option}
                      value={formValues[option]}
                      onChange={handleOptionChange}
                    />
                  ))}
              </div>
              <div
                className="naxatw-flex naxatw-justify-end"
                title="Add Option"
              >
                <MaterialIcon
                  name="add"
                  className="naxatw-text-icon-md naxatw-text-white"
                  wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-bg-secondary-300 naxatw-cursor-pointer hover:naxatw-bg-secondary-400"
                />
              </div>
            </div>
          )}
        </div>
        <div className="naxatw-flex naxatw-justify-center">
          <Button
            className="naxatw-btn-primary naxatw-mt-10"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
            onClick={handleSubmit}
          >
            {individualAttribute ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
