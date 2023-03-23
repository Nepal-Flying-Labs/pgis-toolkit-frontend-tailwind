import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select';
import FormErrorMessage from '@Components/common/FormErrorMessage';
import { checkIfLoading } from '@Utils/loaderSelector';

const { saveBufferLayerRequest } = Creators;
const { toggleModalTwo } = CommonCreators;

export default function SaveBufferLayer() {
  const themes = useSelector(state => state.analysis.themes);
  const selectedAnalysis = useSelector(
    state => state.bufferAnalysis.results.selectedAnalysis,
  );
  const isSaving = useSelector(state =>
    checkIfLoading(state, [Types.SAVE_BUFFER_LAYER_REQUEST]),
  );
  const dispatch = useDispatch();

  const { values, meta, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: selectedAnalysis?.name,
      category: '',
    },
    required: ['name', 'category'],
    onSubmit: data => {
      const payloadData = {
        analysis: selectedAnalysis.id,
        name: data.name,
        theme: data.category,
        style: selectedAnalysis.style,
      };
      dispatch(saveBufferLayerRequest(payloadData));
    },
  });

  return (
    <div>
      <div className="naxatw-space-y-5">
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
        <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-end">
          <div className="naxatw-space-y-2 naxatw-basis-3/4">
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
          <div title="Add Category" className="naxatw-basis-1/4">
            <Button
              className="naxatw-btn-secondary naxatw-btn-noborder"
              onClick={() => {
                dispatch(toggleModalTwo('add-dataset-category'));
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-10 naxatw-gap-2">
        <Button
          className="naxatw-btn-primary"
          isLoading={isSaving}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
