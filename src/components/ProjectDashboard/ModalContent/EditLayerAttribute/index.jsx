/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import { Creators, Types } from '@Actions/projectMap';
import { checkIfLoading } from '@Utils/loaderSelector';
import ImageUpload from '@Components/ProjectDashboard/Map/MapSidebar/ImageUpload/index';
import Spinner from '@Components/common/Spinner/index';

const { updateLayerAttributeRequest, getAttributeFieldRequest } = Creators;

const EditLayerAttribute = () => {
  const dispatch = useDispatch();
  const selectedAttribute = useSelector(
    state => state.projectMap.layerAttributesList.selectedLayerAttribute,
  );
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_ATTRIBUTE_REQUEST]),
  );
  const selectedEditFeature = useSelector(
    state => state.projectMap.selectedEditFeature,
  );
  const [imageList, setImageList] = useState(selectedEditFeature?.images || []);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ATTRIBUTE_FIELD_REQUEST]),
  );

  useEffect(() => {
    if (!selectedEditFeature) return;
    setImageList(selectedEditFeature.images);
  }, [selectedEditFeature]);

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(
      getAttributeFieldRequest({
        layer: selectedLayer.id,
        featureId: selectedAttribute.id,
      }),
    );
  }, [dispatch, selectedAttribute, selectedLayer]);

  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: selectedAttribute || {},
    onSubmit: data => {
      const { id } = selectedAttribute;
      dispatch(
        updateLayerAttributeRequest(id, {
          attributes: data,
          image: imageList,
        }),
      );
    },
  });

  useEffect(() => {
    setValues(selectedAttribute);
  }, [setValues, selectedAttribute]);

  return isLoading ? (
    <div className="naxatw-h-[500px] naxatw-flex naxatw-items-center naxatw-justify-center">
      <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
    </div>
  ) : (
    <div>
      <div className="naxatw-space-y-3 naxatw-grid naxatw-grid-cols-2 naxatw-gap-x-3 naxatw-max-h-[500px] naxatw-overflow-y-auto scrollbar">
        {Object.keys(selectedAttribute).map(attribute =>
          attribute === selectedEditFeature?.name ? (
            <div className="naxatw-space-y-2">
              <label className="naxatw-label">{attribute}</label>
              <ImageUpload imageList={imageList} setImageList={setImageList} />
            </div>
          ) : (
            <Input
              key={attribute.id}
              label={attribute}
              name={attribute}
              value={values[attribute]}
              onChange={handleChange}
              disabled={attribute === 'id'}
              className={attribute === 'id' ? 'naxatw-bg-grey-100' : ''}
            />
          ),
        )}
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
