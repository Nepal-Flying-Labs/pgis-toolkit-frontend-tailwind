/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'wkt';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { isEmpty } from '@Utils/commonUtils';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import SearchSelect from '@Components/common/SearchSelect/index';
import { format } from 'date-fns';
// import Select from '@Components/common/Select/index';
import ImageUpload from '../ImageUpload/index';

const {
  setProjectMapState,
  getLayerAttributeFieldsRequest,
  postNewLayerFeatureRequest,
  updateFeatureCollectionRequest,
} = ProjectMapCreators;

export default function EditFeatureSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const drawnFeatureWkt = useSelector(
    state => state.projectMap.drawnFeatureWkt,
  );
  const featureGeojson = useSelector(state => state.projectMap.featureGeojson);
  const editFeatureId = useSelector(state => state.projectMap.editFeatureId);
  const isFeatureModified = useSelector(
    state => state.projectMap.isFeatureModified,
  );
  const modifiedFeatureGeojson = useSelector(
    state => state.projectMap.modifiedFeatureGeojson,
  );
  const individualAttributeData = useSelector(
    state => state.projectMap.individualAttributeData,
  );
  const imageDataType = individualAttributeData.filter(
    item => item.data_type === 'image' && item.mandatory,
  );
  const featureImage = useSelector(state => state.projectMap.featureImage);
  const isPosting = useSelector(state =>
    checkIfLoading(state, [
      Types.POST_NEW_LAYER_FEATURE_REQUEST,
      Types.UPDATE_FEATURE_COLLECTION_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      setProjectMapState({
        selectedLayer: null,
        sidebarContent: '',
        drawType: null,
        drawnFeatureWkt: null,
        featureGeojson: null,
        modifiedFeatureGeojson: null,
        individualAttributeData: [],
        layerAttributes: null,
        editFeatureId: null,
        featureImage: [],
      }),
    );
  };

  const [imageList, setImageList] = useState(featureImage || []);
  const [imageError, setImageError] = useState(false);

  const filterImageList = imageList.filter(image => !image.isDeleted);

  const {
    values,
    meta,
    handleChange,
    handleSubmit,
    setValues,
    setRequiredFields,
    inputProps,
    isFieldsChanged,
  } = useForm({
    initialValues: {},
    onErrorSubmit: () => {
      if (!isEmpty(imageDataType) && isEmpty(filterImageList)) {
        setImageError(true);
      }
      dispatch(
        toastActions.error({
          message: 'Please fill out all the required fields.',
        }),
      );
    },
    onSubmit: data => {
      const payloadData = {};
      if (sidebarContent === 'add-feature') {
        if (!drawnFeatureWkt) {
          dispatch(toastActions.error({ message: 'Please draw a geometry' }));
          return;
        }
        if (!isEmpty(imageDataType) && isEmpty(filterImageList)) {
          dispatch(
            toastActions.error({
              message: 'Please fill out all the required fields.',
            }),
          );
          setImageError(true);
          return;
        }
        if (!isEmpty(imageDataType)) {
          payloadData.image = imageList;
        }
        payloadData.layer = selectedLayer.id;
        payloadData.geometry = drawnFeatureWkt;
        payloadData.attributes = data;
        dispatch(postNewLayerFeatureRequest(payloadData));
        return;
      }
      if (!modifiedFeatureGeojson) {
        dispatch(toastActions.error({ message: 'Please draw a geometry' }));
        return;
      }
      if (isFeatureModified) {
        const modifiedFeatureWkt = stringify(modifiedFeatureGeojson);
        payloadData.geometry = modifiedFeatureWkt;
      }
      if (isFieldsChanged) {
        payloadData.attributes = data;
      }
      if (!isEmpty(imageDataType) && isEmpty(filterImageList)) {
        dispatch(
          toastActions.error({
            message: 'Please fill out all the required fields.',
          }),
        );
        setImageError(true);
        return;
      }
      if (
        !isEmpty(imageDataType) &&
        !isEmpty(imageList.filter(image => image.isChanged))
      ) {
        payloadData.image = imageList;
      } else if (!isEmpty(imageList.filter(image => image.isChanged))) {
        payloadData.image = imageList;
      }
      if (!isEmpty(payloadData)) {
        dispatch(
          updateFeatureCollectionRequest(editFeatureId, {
            ...payloadData,
          }),
        );
      } else {
        handleCancel();
      }
    },
  });

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(
      getLayerAttributeFieldsRequest({
        layer: selectedLayer.id,
        check_mandatory: 'True',
      }),
    );
  }, [dispatch, selectedLayer]);

  useEffect(() => {
    if (!individualAttributeData) return;
    const formState = individualAttributeData.reduce(
      (obj, item) => ({
        ...obj,
        [item.name]: item.value,
      }),
      {},
    );
    setValues(formState);
  }, [individualAttributeData, setValues]);

  useEffect(() => {
    if (
      !individualAttributeData ||
      (!isFieldsChanged && sidebarContent !== 'add-feature')
    )
      return;
    const mandatoryFields = individualAttributeData
      .filter(item => item.mandatory && item.data_type !== 'image')
      .map(item => item.name);
    setRequiredFields(mandatoryFields);
  }, [
    individualAttributeData,
    setRequiredFields,
    isFieldsChanged,
    sidebarContent,
  ]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-5">
      <div className="naxatw-flex naxatw-items-center">
        <h4>{sidebarContent === 'add-feature' ? 'Add' : 'Edit'} Feature</h4>
      </div>

      <div
        className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-pr-[0.25rem] -naxatw-mr-[0.7125rem]"
        style={{
          height: `calc(100vh - ${projectHeaderHeight}px - 9rem)`,
        }}
      >
        {sidebarContent === 'add-feature' && !drawnFeatureWkt && (
          <div className="naxatw-flex naxatw-items-center">
            <div className="naxatw-w-full naxatw-space-y-2">
              <label className="naxatw-label">Draw Feature on Map</label>
            </div>
          </div>
        )}

        {(drawnFeatureWkt || featureGeojson) && (
          <>
            <div className="naxatw-flex naxatw-items-center">
              <div className="naxatw-w-full naxatw-space-y-2">
                <label className="naxatw-label">Attributes</label>
              </div>
            </div>

            {individualAttributeData.map(item => (
              <div key={item.id} className="naxatw-flex naxatw-items-center">
                <div className="naxatw-w-full naxatw-space-y-2">
                  <label htmlFor={item.id} className="naxatw-label">
                    {item.alias || item.name}
                    {item.mandatory ? '*' : ''}
                  </label>
                  {item.dropdown_field ? (
                    <SearchSelect
                      className="naxatw-bg-white naxatw-h-[48px] naxatw-px-2"
                      options={item.options}
                      onChange={data =>
                        handleChange({
                          target: {
                            name: `${item.name}`,
                            value: data ? data.name : null,
                          },
                        })
                      }
                      selected={
                        item.options.filter(
                          opt => opt.name === values[`${item.name}`],
                        )?.[0]?.name
                      }
                      disabled={!item.editable}
                    />
                  ) : item.data_type === 'date' ? (
                    <CustomCalendar
                      className="naxatw-bg-white"
                      startDate={new Date()}
                      onChange={date => {
                        handleChange({
                          target: {
                            name: `${item.name}`,
                            value: format(date, 'yyyy-MM-dd'),
                          },
                        });
                      }}
                      selected={values[`${item.name}`] || ''}
                      disabled={!item.editable}
                    />
                  ) : item.data_type === 'image' ? (
                    <ImageUpload
                      // setImageUrl={url => handlePostImage(url)}
                      // setUploadImage={file => handlePostImage(file)}
                      imageList={imageList}
                      setImageList={setImageList}
                      disabled={!item.editable}
                    />
                  ) : (
                    <input
                      id={item.id}
                      type={item.data_type === 'str' ? 'text' : 'number'}
                      className={`naxatw-input ${
                        !item.editable ? 'naxatw-input-disabled' : ''
                      }`}
                      step={item.data_type === 'float' ? 'any' : ''}
                      name={item.name}
                      value={values[`${item.name}`] || ''}
                      onChange={handleChange}
                      disabled={!item.editable}
                      {...inputProps}
                    />
                  )}
                  {imageError && item.data_type === 'image' && (
                    <FormErrorMessage message="Required" />
                  )}
                  {meta[item.name]?.touched && meta[item.name]?.error && (
                    <FormErrorMessage message="Required" />
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="naxatw-fixed naxatw-flex naxatw-bottom-0 naxatw-w-full naxatw-py-4 naxatw-bg-grey-100 naxatw-gap-3">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSubmit}
            isLoading={isPosting}
          >
            Save
          </Button>

          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
