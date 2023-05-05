import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import useForm from '@Hooks/useForm';
import Input from '@Components/common/Input';
import FormErrorMessage from '@Components/common/FormErrorMessage';
import Button from '@Components/common/Button';
import TextArea from '@Components/common/TextArea';

const initialValues = {
  analysisName: '',
  description: '',
};

const { copyLayerDataRequest, setAnalysisState } = AnalysisCreators;

export default function CreateAnalysis() {
  const { organizationId, projectId } = useParams();
  const selectedAnalysis = useSelector(
    state => state.analysis.selectedAnalysis,
  );
  const dispatch = useDispatch();
  const { values, meta, handleChange, handleSubmit } = useForm({
    initialValues,
    required: ['analysisName'],
    onSubmit: data => {
      const { analysisType } = selectedAnalysis;
      dispatch(
        setAnalysisState({
          analysisDetail: data,
        }),
      );
      dispatch(
        copyLayerDataRequest({
          analysisType,
          organizationId,
          projectId,
        }),
      );
    },
  });

  return (
    <div>
      <div className="naxatw-space-y-4">
        <div>
          <Input
            label="Analysis Name"
            placeholder="Enter Analysis Name"
            name="analysisName"
            value={values.analysisName}
            onChange={handleChange}
          />
          {meta?.analysisName?.touched && meta?.analysisName?.error && (
            <FormErrorMessage message="Analysis Name is required." />
          )}
        </div>

        <div>
          <TextArea
            label="Description"
            placeholder="Enter Description"
            className="!naxatw-min-h-[4.5rem]"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        className="naxatw-flex naxatw-items-center naxatw-justify-center
          naxatw-mt-10"
      >
        <Button
          className="naxatw-btn-primary"
          onClick={handleSubmit}
          // isLoading={loading}
          // loaderClassName="naxatw-fill-secondary-400"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
