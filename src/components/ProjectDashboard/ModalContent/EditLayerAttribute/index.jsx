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
import { isEmpty } from '@Utils/commonUtils';

const { updateLayerAttributeRequest, getFeatureImageRequest } = Creators;

const EditLayerAttribute = () => {
  const dispatch = useDispatch();
  const selectedAttribute = useSelector(
    state => state.projectMap.layerAttributesList.selectedLayerAttribute,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_ATTRIBUTE_REQUEST]),
  );
  const featureImage = useSelector(state => state.projectMap.featureImage);
  const [imageList, setImageList] = useState(featureImage || []);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_FEATURE_IMAGE_REQUEST]),
  );

  useEffect(() => {
    setImageList(featureImage);
  }, [featureImage]);

  const selectedLayerAttribute = useSelector(
    state => state.projectMap.selectedLayerAttribute,
  );

  const imageTypeAttribute = selectedLayerAttribute?.filter(
    item => item.data_type === 'image',
  );

  useEffect(() => {
    if (!selectedAttribute) return;
    dispatch(getFeatureImageRequest(selectedAttribute.id));
  }, [dispatch, selectedAttribute]);

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
        {Object.keys(selectedAttribute).map(
          attribute =>
            attribute !== imageTypeAttribute?.[0]?.name && (
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

        {!isEmpty(imageTypeAttribute) && (
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">{imageTypeAttribute[0].name}</label>
            <ImageUpload imageList={imageList} setImageList={setImageList} />
          </div>
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
