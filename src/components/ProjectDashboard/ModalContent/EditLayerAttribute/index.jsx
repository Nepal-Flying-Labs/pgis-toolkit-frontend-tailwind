/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import { Creators, Types } from '@Actions/projectMap';
import { checkIfLoading } from '@Utils/loaderSelector';

const { updateLayerAttributeRequest } = Creators;

const EditLayerAttribute = () => {
  const dispatch = useDispatch();
  const selectedAttribute = useSelector(
    state => state.projectMap.layerAttributesList.selectedLayerAttribute,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_ATTRIBUTE_REQUEST]),
  );

  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: selectedAttribute || {},
    onSubmit: data => {
      const { id } = selectedAttribute;
      dispatch(
        updateLayerAttributeRequest(id, {
          attributes: data,
        }),
      );
    },
  });

  useEffect(() => {
    setValues(selectedAttribute);
  }, [setValues, selectedAttribute]);

  return (
    <div>
      <div className="naxatw-space-y-3 naxatw-grid naxatw-grid-cols-2 naxatw-gap-x-3">
        {Object.keys(selectedAttribute).map(attribute => (
          <Input
            label={attribute}
            name={attribute}
            value={values[attribute]}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center">
        <Button
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          className="naxatw-btn-primary naxatw-mt-3"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditLayerAttribute;
