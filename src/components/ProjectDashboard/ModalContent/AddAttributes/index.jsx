/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
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
import { Creators as CommonCreators } from '@Actions/common';
import { checkIfLoading } from '@Utils/loaderSelector';
import useForm from '@Hooks/useForm';
import Toggle from '@Components/common/Toggle/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import isEmpty from '@Utils/isEmpty';
import toastActions from '@Actions/toast';
import Spinner from '@Components/common/Spinner/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';

const { togglePromptDialog } = CommonCreators;

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
  const optionsError = [];

  for (let i = 0; i < data.length; i += 1) {
    if (!data[i].name) optionsError.push(data[i].id);
  }
  return optionsError;
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
  {
    id: 5,
    name: 'image',
    displayName: 'Image',
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
  const warningRef = useRef(true);
  const [errorFields, setErrorFields] = useState([]);
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
  const dropdownLoading = useSelector(state =>
    checkIfLoading(state, [
      ProjectMapTypes.GET_FIELDS_DROPDOWN_OPTION_REQUEST,
      ProjectMapTypes.UPDATE_DROPDOWN_FIELD_REQUEST,
      Types.UPDATE_TEMPLATE_DROPDOWN_REQUEST,
      Types.GET_TEMPLATE_DROPDOWN_CHOICE_REQUEST,
    ]),
  );
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
    onSubmit: () => {
      const errors = [];
      if (!values.name) errors.push('name');
      if (!values.data_type) errors.push('data_type');
      let optionsErrors = [];
      if (isDropdown === 'yes') {
        optionsErrors = validate(formValues);
      }
      const newErrorFields = [...errors, ...optionsErrors];
      setErrorFields(newErrorFields);
      if (isEmpty(newErrorFields)) {
        if (individualAttribute) {
          const patchData = formValues?.filter(
            item => item.flag === 'patch' && item.isChanged,
          );
          const postData = formValues?.filter(item => item.flag === 'post');
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
        } else {
          dispatch(
            postLayerAttributeFieldsRequest({
              ...values,
              data_type: values.data_type,
              layer: selectedLayer.id,
              dropdown_field: isDropdown === 'yes' ? 'True' : 'False',
              postData: formValues,
            }),
          );
        }
      } else {
        dispatch(
          toastActions.error({
            message: 'Please fill all the required fields.',
          }),
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

  const handleDeleteOption = (id, flag) => {
    if (individualAttribute && flag === 'patch') {
      dispatch(setProjectMapState({ selectedDropdownOptionId: id }));
      dispatch(togglePromptDialog('delete-dropdown-option'));
    } else {
      const newData = formValues.filter(data => data.id !== id);
      setFormValues(newData);
    }
  };

  // add form fields for dropdown in post
  useEffect(() => {
    if (!individualAttribute && isDropdown === 'yes') {
      setFormValues([
        { id: 1, name: '' },
        { id: 2, name: '' },
      ]);
    }
  }, [individualAttribute, isDropdown]);

  // add form fields in edit if no dropdown option
  useEffect(() => {
    if (!dropdownLoading)
      if (
        individualAttribute &&
        isEmpty(dropdownOptions) &&
        isDropdown === 'yes'
      )
        setFormValues([
          {
            id: 1,
            name: '',
            flag: 'post',
            attribute: individualAttribute?.id,
            edit: true,
          },
          {
            id: 2,
            name: '',
            flag: 'post',
            attribute: individualAttribute?.id,
            edit: true,
          },
        ]);
  }, [dropdownLoading, dropdownOptions, individualAttribute, isDropdown]);

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

  const handleFocus = () => {
    if (warningRef.current) {
      dispatch(togglePromptDialog('dropdown-edit-warning'));
      warningRef.current = false;
    }
  };

  return (
    <div className="naxatw-container ">
      <div className="naxatw-w-[41.875rem] naxatw-mx-auto naxatw-px-7 naxatw-py-5">
        <div className="naxatw-space-y-5">
          <div>
            <Input
              label="Attribute"
              placeholder="Enter Attribute Name"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              className={individualAttribute ? 'naxatw-input-disabled' : ''}
              disabled={!!individualAttribute}
            />
            {errorFields.includes('name') && (
              <FormErrorMessage message="Attribute name is required" />
            )}
          </div>

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
              {errorFields.includes('data_type') && (
                <FormErrorMessage message="Data type is required" />
              )}
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
              <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-basis-2/4">
                <div className="naxatw-basis-2/4 naxatw-space-y-2">
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
                <div className="naxatw-basis-2/4 naxatw-space-y-2">
                  <label className="naxatw-label">Is editable?</label>
                  <div className="naxatw-flex naxatw-items-center naxatw-h-[40px]">
                    <Toggle
                      checked={values.editable}
                      onChange={() => {
                        handleCustomChange('editable', !values.editable);
                      }}
                    />
                  </div>
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

          {isDropdown === 'yes' &&
            (!dropdownLoading ? (
              <div className="naxatw-space-y-2">
                <span className="naxatw-text-body-lg naxatw-font-semibold">
                  Choice Options
                </span>
                <div className="naxatw-max-h-[200px] naxatw-space-y-2 naxatw-overflow-y-auto scrollbar naxatw-px-3 naxatw-py-2">
                  {formValues &&
                    formValues.map((option, index) => (
                      <div key={option.id}>
                        <div
                          key={option.id}
                          className="naxatw-flex naxatw-gap-x-1 naxatw-items-end"
                        >
                          <div className="naxatw-basis-11/12">
                            <Input
                              key={option.id}
                              label={`Option ${index + 1}`}
                              placeholder={`Option ${index + 1}`}
                              name={`${option.id}`}
                              value={option.name}
                              onChange={handleOptionChange}
                              onFocus={handleFocus}
                            />
                          </div>
                          {formValues.length > 2 && (
                            <MaterialIcon
                              name="delete_outline"
                              className="naxatw-text-[#FF0F0F] naxatw-text-icon-md"
                              wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer naxatw-basis-1/12"
                              onIconClick={() =>
                                handleDeleteOption(option.id, option.flag)
                              }
                            />
                          )}
                        </div>
                        {errorFields.includes(option.id) && (
                          <FormErrorMessage message="Required" />
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
            ) : (
              <div className="naxatw-ml-7">
                <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
              </div>
            ))}
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
