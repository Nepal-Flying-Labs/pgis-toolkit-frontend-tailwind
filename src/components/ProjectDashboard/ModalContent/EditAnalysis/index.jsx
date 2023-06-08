/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectMap';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import useForm from '@Hooks/useForm';

const { updateAnalysisRequest } = ProjectDashboardCreators;
const { getAnalysisByIdRequest } = AnalysisCreators;

export default function EditAnalysis() {
  const [errorFields, setErrorFields] = useState({});
  const analysis = useSelector(state => state.projectMap.selectedAnalysis);
  const analysisById = useSelector(
    state => state.analysis.selectedAnalysisById,
  );

  const analysisWithDesc = useMemo(
    () => ({
      ...analysis,
      description: analysisById?.description,
    }),
    [analysis, analysisById],
  );

  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_ANALYSIS_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  const formSubmit = () => {
    if (isUploading) return;
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    setErrorFields(errors);

    if (isEmpty(errorFields)) {
      const formData = {
        name: values.name,
        description: values.description,
      };

      dispatch(updateAnalysisRequest(values.id, formData));
    }
  };

  const { values, handleChange, handleSubmit, setValues } = useForm({
    initialValues: analysisWithDesc,
    onSubmit: formSubmit,
  });

  useEffect(() => {
    if (isEmpty(analysisWithDesc)) return null;
    return setValues(analysisWithDesc);
  }, [analysisWithDesc, setValues]);

  useEffect(() => {
    dispatch(getAnalysisByIdRequest(analysisWithDesc.id));
  }, [analysisWithDesc.id, dispatch]);

  return (
    <div>
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto naxatw-mb-5 scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Name*</label>
            <input
              type="text"
              className="naxatw-input"
              name="name"
              value={values.name || analysisWithDesc.name}
              placeholder="Enter Name"
              onChange={handleChange}
            />
            {errorFields?.name && <FormErrorMessage message="Required" />}
          </div>
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-grow">
            <label className="naxatw-label">Description*</label>
            <input
              type="text"
              className="naxatw-input"
              name="description"
              value={values.description || analysisWithDesc?.description}
              placeholder="Enter Description"
              onChange={handleChange}
            />
            {errorFields?.description && (
              <FormErrorMessage message="Required" />
            )}
          </div>
        </div>
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          onClick={handleSubmit}
          isLoading={isUploading}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
