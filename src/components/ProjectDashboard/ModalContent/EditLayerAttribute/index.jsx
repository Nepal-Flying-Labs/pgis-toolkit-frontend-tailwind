/* eslint-disable no-nested-ternary */
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
import SearchSelect from '@Components/common/SearchSelect/index';
import { isEmpty } from '@Utils/commonUtils';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { format } from 'date-fns';

const { updateLayerAttributeRequest, getFeatureImageRequest } = Creators;

const EditLayerAttribute = () => {
  const dispatch = useDispatch();
  const selectedAttribute = useSelector(
    state => state.projectMap.layerAttributesList.selectedLayerAttribute,
  );
  const individualFeatureData = useSelector(
    state => state.projectMap.individualFeatureData,
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
  const dateTypeAttribute = selectedLayerAttribute?.filter(
    item => item.data_type === 'date',
  );

  const dropdownFields = selectedLayerAttribute
    ?.filter(item => item.dropdown_field)
    .map(item => item.name);

  const dropdownOptions = useSelector(
    state => state.projectMap.fieldsDropdownOptions,
  );

  const nonEditableAttributes = selectedLayerAttribute.reduce((acc, obj) => {
    if (!obj.editable) {
      acc.push(obj.name);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (!selectedAttribute) return;
    dispatch(getFeatureImageRequest(selectedAttribute.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedAttribute]);

  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialValues: individualFeatureData || {},
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
    setValues(individualFeatureData);
  }, [setValues, individualFeatureData]);

  return isLoading ? (
    <div className="naxatw-h-[500px] naxatw-flex naxatw-items-center naxatw-justify-center">
      <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
    </div>
  ) : (
    <div>
      <div className="naxatw-max-h-[500px] naxatw-overflow-y-auto scrollbar naxatw-space-y-3">
        <div className="naxatw-space-y-3 naxatw-grid naxatw-grid-cols-2 naxatw-gap-x-3">
          {Object.keys(selectedAttribute).map(
            attribute =>
              attribute !== imageTypeAttribute?.[0]?.name &&
              (dropdownFields.includes(attribute) ? (
                <div className="naxatw-space-y-2" key={attribute}>
                  <label className="naxatw-label">{attribute}</label>
                  <SearchSelect
                    key={attribute}
                    className="naxatw-bg-white naxatw-h-[48px] naxatw-px-2"
                    options={dropdownOptions[attribute]}
                    onChange={data =>
                      handleChange({
                        target: {
                          name: `${attribute}`,
                          value: data ? data.name : null,
                        },
                      })
                    }
                    selected={
                      dropdownOptions[attribute].filter(
                        opt => opt.name === values[`${attribute}`],
                      )?.[0]?.name
                    }
                    disabled={nonEditableAttributes.includes(attribute)}
                  />
                </div>
              ) : dateTypeAttribute
                  .map(item => item.name)
                  .includes(attribute) ? (
                <div className="naxatw-space-y-2" key={attribute}>
                  <label className="naxatw-label">{attribute}</label>
                  <CustomCalendar
                    className="naxatw-bg-white"
                    startDate={new Date()}
                    onChange={date => {
                      handleChange({
                        target: {
                          name: `${attribute}`,
                          value: format(date, 'yyyy-MM-dd'),
                        },
                      });
                    }}
                    selected={values[`${attribute}`] || ''}
                    disabled={nonEditableAttributes.includes(attribute)}
                  />
                </div>
              ) : (
                <Input
                  key={attribute.id}
                  label={attribute}
                  name={attribute}
                  value={values[attribute]}
                  onChange={handleChange}
                  disabled={nonEditableAttributes.includes(attribute)}
                  className={attribute === 'id' ? 'naxatw-bg-grey-100' : ''}
                />
              )),
          )}
        </div>
        {!isEmpty(imageTypeAttribute) && (
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">{imageTypeAttribute[0].name}</label>
            <ImageUpload
              imageList={imageList}
              setImageList={setImageList}
              view="row"
              disabled={!imageTypeAttribute[0].editable}
            />
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
