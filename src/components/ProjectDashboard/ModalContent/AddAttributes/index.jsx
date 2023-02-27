/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
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
import MaterialIcon from '@Components/common/MaterialIcon/index';
import isEmpty from '@Utils/isEmpty';
import toastActions from '@Actions/toast';

const {
  postTemplateAttributeRequest,
  clearIndividualAttribute,
  updateTemplateAttributeRequest,
  updateTemplateDropdownRequest,
  getTemplateDropdownChoiceRequest,
} = Creators;

const {
  updateLayerAttributeFieldsRequest,
  updateDropdownFieldRequest,
  getFieldsDropdownOptionRequest,
  setProjectMapState,
  postLayerAttributeFieldsRequest,
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

function validate(data) {
  const newData = data.map(d => (d.name ? { ...d } : { ...d, error: true }));
  const errorData = newData.filter(d => d.error);
  return errorData.length > 0;
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
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.POST_TEMPLATE_ATTRIBUTE_REQUEST,
      Types.UPDATE_TEMPLATE_ATTRIBUTE_REQUEST,
      ProjectMapTypes.UPDATE_LAYER_ATTRIBUTE_FIELDS_REQUEST,
      ProjectMapTypes.POST_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    ]),
  );
  // const dropdownLoading = useSelector(state =>
  //   checkIfLoading(state, [
  //     ProjectMapTypes.GET_FIELDS_DROPDOWN_OPTION_REQUEST,
  //     Types.GET_TEMPLATE_DROPDOWN_CHOICE_REQUEST,
  //   ]),
  // );
  const individualAttribute = useSelector(
    state => state.projectDashboard.data.manageData.individualAttribute,
  );
  const dropdownOptions = useSelector(
    tabname === 'map'
      ? state => state.projectMap.fieldsDropdownOptions
      : state => state.projectDashboard.data.manageData.dropdownOptions,
  );

  const [formValues, setFormValues] = useState(dropdownOptions || []);
  const [isDropdown, setIsDropdown] = useState(
    individualAttribute?.dropdown_field ? 'yes' : 'no',
  );

  // reset state on modal unmount
  useEffect(() => {
    if (
      showModal &&
      (modalContent === 'add-attributes' ||
        modalContent === 'manage-attributes')
    )
      return;

    dispatch(setProjectMapState({ selectedLayer: null }));
  }, [dispatch, showModal, modalContent]);

  useEffect(() => {
    setFormValues(dropdownOptions);
  }, [dropdownOptions]);

  const { values, handleChange, handleSubmit, handleCustomChange } = useForm({
    initialValues: individualAttribute || initialState,
    onSubmit: data => {
      if (individualAttribute) {
        const patchData = formValues.filter(
          item => item.flag === 'patch' && item.isChanged,
        );
        const postData = formValues.filter(item => item.flag === 'post');
        const finalPayload = diffObject(individualAttribute, values);
        if (tabname === 'manage-data') {
          dispatch(
            updateTemplateAttributeRequest(individualAttribute.id, {
              ...finalPayload,
              patchData,
              postData,
            }),
          );
        } else {
          dispatch(
            updateLayerAttributeFieldsRequest(individualAttribute.id, {
              ...finalPayload,
              patchData,
              postData,
            }),
          );
        }
      } else if (tabname === 'manage-data') {
        dispatch(
          postTemplateAttributeRequest({
            ...values,
            data_type: values.data_type,
            layer_template: selectedData.id,
            dropdown_field: isDropdown === 'yes',
            postData: formValues,
          }),
        );
      } else if (
        (isDropdown === 'yes' && !validate(formValues)) ||
        isDropdown === 'no'
      ) {
        dispatch(
          postLayerAttributeFieldsRequest({
            ...values,
            data_type: values.data_type,
            layer: selectedLayer.id,
            dropdown_field: isDropdown === 'yes' ? 'True' : 'False',
            postData: formValues,
          }),
        );
      } else {
        dispatch(
          toastActions.error({ message: 'Options field cannot be empty' }),
        );
      }
    },
  });

  const handleDropdownChange = e => {
    setIsDropdown(e.target.value);
    if (individualAttribute)
      tabname === 'map'
        ? dispatch(
            updateDropdownFieldRequest(individualAttribute.id, {
              dropdown_field: e.target.value === 'yes',
            }),
          )
        : dispatch(
            updateTemplateDropdownRequest(individualAttribute.id, {
              dropdown_field: e.target.value === 'yes',
            }),
          );
  };

  const handleOptionChange = e => {
    const { value } = e.target;
    const newData = formValues.map(item =>
      item.id === +e.target.name
        ? { ...item, name: value, isChanged: true }
        : { ...item },
    );
    setFormValues(newData);
  };

  const handleAddOption = () => {
    setFormValues([
      {
        id: Date.now(),
        name: '',
        flag: 'post',
        attribute: individualAttribute?.id || '',
      },
      ...formValues,
    ]);
  };

  const handleDeleteOption = id => {
    const newData = formValues.filter(data => data.id !== id);
    setFormValues(newData);
  };

  useEffect(() => {
    if (!individualAttribute && isDropdown === 'yes') {
      setFormValues([
        { id: 1, name: '' },
        { id: 2, name: '' },
      ]);
    }
  }, [individualAttribute, isDropdown]);

  // useEffect(() => {
  //   if (individualAttribute && !dropdownOptions && isDropdown === 'yes')
  //     setFormValues([
  //       { id: 1, name: '' },
  //       { id: 2, name: '' },
  //     ]);
  // }, [dropdownOptions, individualAttribute, isDropdown]);

  useEffect(() => {
    if (individualAttribute?.dropdown_field) {
      tabname === 'map'
        ? dispatch(
            getFieldsDropdownOptionRequest({
              attribute: individualAttribute.id,
            }),
          )
        : dispatch(
            getTemplateDropdownChoiceRequest({
              attribute: individualAttribute.id,
            }),
          );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [individualAttribute]);

  useEffect(
    () => () => {
      dispatch(clearIndividualAttribute());
      dispatch(setProjectMapState({ fieldsDropdownOptions: null }));
    },
    [dispatch],
  );

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
            className={individualAttribute ? 'naxatw-input-disabled' : ''}
            disabled={!!individualAttribute}
          />
          <Input
            label="Alias"
            placeholder="Enter alias"
            name="alias"
            value={values.alias || ''}
            onChange={handleChange}
          />
          <div className="naxatw-flex naxatw-gap-x-5 naxatw-justify-between">
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
              <div className="naxatw-basis-2/4 naxatw-space-y-2">
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
                <label className="naxatw-label">Is mandatory?</label>
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
          </div>

          <div className="naxatw-basis-1/4 naxatw-space-y-2">
            <label className="naxatw-label">Is choice/dropdown field?</label>
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

          {isDropdown === 'yes' && (
            <div className="naxatw-space-y-2">
              <span className="naxatw-text-body-lg naxatw-font-semibold">
                Choice Options
              </span>
              <div className="naxatw-max-h-[200px] naxatw-space-y-2 naxatw-overflow-y-auto scrollbar naxatw-px-3 naxatw-py-2">
                {formValues &&
                  formValues.map((option, index) => (
                    <div className="naxatw-flex naxatw-gap-x-1 naxatw-items-end">
                      <div className="naxatw-basis-11/12">
                        <Input
                          key={option.id}
                          label={`Option ${index + 1}`}
                          placeholder={`Option ${index + 1}`}
                          name={`${option.id}`}
                          value={option.name}
                          onChange={handleOptionChange}
                        />
                      </div>
                      {option.flag === 'post' && (
                        <MaterialIcon
                          name="delete_outline"
                          className="naxatw-text-[#FF0F0F] naxatw-text-icon-md"
                          wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer naxatw-basis-1/12"
                          onIconClick={() => handleDeleteOption(option.id)}
                        />
                      )}
                    </div>
                  ))}
              </div>

              <Button
                className="naxatw-btn naxatw-btn-link "
                onClick={handleAddOption}
              >
                Add Option
              </Button>
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
