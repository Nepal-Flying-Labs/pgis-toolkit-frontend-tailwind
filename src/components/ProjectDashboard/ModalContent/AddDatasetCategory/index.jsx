import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Input from '@Components/common/Input/index';
import Button from '@Components/common/Button/index';
import { Creators, Types } from '@Actions/projectDashboard';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import { checkIfLoading } from '@Utils/loaderSelector';

const { postDatasetThemeRequest } = Creators;

const AddDatasetCategory = () => {
  const { projectId } = useParams();
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.POST_DATASET_THEME_REQUEST]),
  );

  const handleChange = e => {
    setCategory(e.target.value);
    setError(false);
  };

  const handleAdd = () => {
    if (!category) {
      setError(true);
    } else {
      dispatch(postDatasetThemeRequest({ project: projectId, name: category }));
    }
  };

  return (
    <div>
      <div>
        <Input
          label="Category Name"
          placeholder="Enter Category Name"
          value={category}
          onChange={handleChange}
        />
        {error && <FormErrorMessage message="Please add category" />}
        <div className="naxatw-flex naxatw-items-center naxatw-justify-center naxatw-py-3 naxatw-mt-3">
          <Button
            className="naxatw-btn-primary"
            onClick={handleAdd}
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDatasetCategory;
