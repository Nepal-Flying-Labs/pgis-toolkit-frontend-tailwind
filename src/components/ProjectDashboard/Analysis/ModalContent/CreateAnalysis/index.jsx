import React from 'react';
import Input from '@Components/common/Input';
import useForm from '@Hooks/useForm';
import FormErrorMessage from '@Components/common/FormErrorMessage';
import Button from '@Components/common/Button/index';

const initialValues = {
  analysisName: '',
  description: '',
};

export default function CreateAnalysis() {
  const { values, handleChange, errors } = useForm({
    initialValues,
  });

  console.log(errors, 'errorsx');

  return (
    <div>
      <div className="naxatw-space-y-4">
        <Input
          label="Analysis Name"
          placeholder="Enter Analysis Name"
          name="analysisName"
          value={values.analysisName}
          onChange={handleChange}
        />
        {errors?.analysisName && (
          <FormErrorMessage message="Analysis Name is required." />
        )}

        <Input
          label="Description"
          placeholder="Enter Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div
        className="naxatw-flex naxatw-items-center naxatw-justify-center
          naxatw-mt-10"
      >
        <Button
          className="naxatw-btn-primary"
          // onClick={handleAdd}
          // isLoading={loading}
          // loaderClassName="naxatw-fill-secondary-400"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
