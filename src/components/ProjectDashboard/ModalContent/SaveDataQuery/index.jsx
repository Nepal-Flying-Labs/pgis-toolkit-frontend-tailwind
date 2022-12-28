import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select';
import FormErrorMessage from '@Components/common/FormErrorMessage';
import { checkIfLoading } from '@Utils/loaderSelector';

const { saveDataQueryRequest } = ProjectMapCreators;

const initialValues = {
  name: '',
  category: null,
};

export default function SaveDataQuery() {
  const themes = useSelector(state => state.projectMap.themes);
  const selectedData = useSelector(
    state => state.projectMap.dataQuery.selectedData,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [ProjectMapTypes.DELETE_LAYER_REQUEST]),
  );
  const dispatch = useDispatch();

  const { values, meta, inputProps, handleChange, handleSubmit } = useForm({
    initialValues,
    required: ['name', 'category'],
    onSubmit: data => {
      const payloadData = {
        layer: selectedData.id,
        name: data.name,
        theme: data.category,
      };
      dispatch(saveDataQueryRequest(payloadData));
    },
  });

  return (
    <div>
      <div className="naxatw-my-5 naxatw-space-y-5">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Name</label>
          <span className="naxatw-flex">
            <input
              type="text"
              className="naxatw-input"
              name="name"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              {...inputProps}
            />
          </span>
          {meta.name.touched && meta.name.error && (
            <FormErrorMessage message="Name is required." />
          )}
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Category</label>
          <Select
            placeholder="Choose"
            options={themes}
            labelKey="name"
            valueKey="id"
            onChange={selectedItem => {
              handleChange({
                target: { name: 'category', value: selectedItem.id },
              });
            }}
            selectedValue={values.category}
            {...inputProps}
          />
          {meta.category.touched && meta.category.error && (
            <FormErrorMessage message="Category is required" />
          )}
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-14 naxatw-gap-2">
        <Button
          className="naxatw-btn-primary"
          isLoading={isDeleting}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
