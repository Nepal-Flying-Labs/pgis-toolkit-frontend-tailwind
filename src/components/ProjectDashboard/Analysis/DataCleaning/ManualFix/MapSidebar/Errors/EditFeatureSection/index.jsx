import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as DataCleaningCreators, Types } from '@Actions/dataCleaning';
import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import { individualAttributeDataSelector } from '@Selectors/dataCleaning';

const { setManualFixState, updateFeatureCollectionRequest, saveAttributeEdit } =
  DataCleaningCreators;

export default function EditFeatureSection() {
  const sidebarContent = useSelector(
    state => state.dataCleaning.manualFix.sidebarContent,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);
  const drawnFeatureWkt = useSelector(
    state => state.dataCleaning.manualFix.drawnFeatureWkt,
  );
  const selectedFeatureGeojson = useSelector(
    state => state.dataCleaning.manualFix.selectedFeatureGeojson,
  );
  const selectedFeatureAttributes = useSelector(
    state => state.dataCleaning.manualFix.selectedFeatureAttributes,
  );
  const isFeatureModified = useSelector(
    state => state.projectMap.isFeatureModified,
  );
  const modifiedFeatureGeojson = useSelector(
    state => state.projectMap.modifiedFeatureGeojson,
  );
  const individualAttributeData = useSelector(individualAttributeDataSelector);
  const selectedErrorType = useSelector(
    state => state.dataCleaning.manualFix.selectedErrorType,
  );

  const isPosting = useSelector(state =>
    checkIfLoading(state, [
      Types.POST_NEW_LAYER_FEATURE_REQUEST,
      Types.UPDATE_FEATURE_COLLECTION_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      setManualFixState({
        sidebarContent: 'error-list',
        drawFeatureId: null,
        drawnFeatureWkt: null,
        // featureGeojson: null,
        // modifiedFeatureGeojson: null,
        individualAttributeData: [],
        layerAttributes: null,
        // editFeatureId: null,
      }),
    );
  };

  const {
    values,
    meta,
    handleChange,
    handleSubmit,
    setValues,
    setRequiredFields,
    inputProps,
  } = useForm({
    initialValues: {},
    onErrorSubmit: () => {
      dispatch(
        toastActions.error({
          message: 'Please fill out all the required fields.',
        }),
      );
    },
    onSubmit: (data, isFieldsChanged) => {
      const payloadData = {};
      if (sidebarContent === 'add-feature') {
        if (!drawnFeatureWkt) {
          dispatch(toastActions.error({ message: 'Please draw a geometry' }));
          return;
        }
        payloadData.layer = selectedLayer.id;
        payloadData.geometry = drawnFeatureWkt;
        payloadData.attributes = data;
        dispatch(updateFeatureCollectionRequest(selectedLayer.id, payloadData));
        return;
      }
      if (selectedErrorType === 'multipart') {
        dispatch(saveAttributeEdit(data));
      }
    },
  });

  // useEffect(() => {
  //   if (!selectedLayer) return;
  //   dispatch(
  //     getLayerAttributeFieldsRequest({
  //       layer: selectedLayer.id,
  //       check_mandatory: 'True',
  //     }),
  //   );
  // }, [dispatch, selectedLayer]);

  useEffect(() => {
    if (!individualAttributeData) return;
    const formState = individualAttributeData.reduce(
      (obj, item) => ({
        ...obj,
        [item.name]: item.value,
      }),
      {},
    );
    const mandatoryFields = individualAttributeData
      .filter(item => item.mandatory)
      .map(item => item.name);
    setValues(formState);
    setRequiredFields(mandatoryFields);
  }, [individualAttributeData, setValues, setRequiredFields]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-5">
      <div className="naxatw-flex naxatw-items-center">
        <h4>{sidebarContent === 'add-feature' ? 'Add' : 'Edit'} Feature</h4>
      </div>

      <div
        className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col naxatw-gap-5"
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
              {item.data_type === 'date' ? (
                <CustomCalendar
                  startDate={new Date()}
                  onChange={() => {
                    // handleCustomChange(
                    //   'start_date',
                    //   format(date, 'yyyy-MM-dd'),
                    // );
                  }}
                  selected={values[`${item.name}`] || ''}
                />
              ) : (
                <input
                  id={item.id}
                  type={item.data_type === 'str' ? 'text' : 'number'}
                  className="naxatw-input"
                  step={item.data_type === 'float' ? 'any' : ''}
                  name={item.name}
                  value={values[`${item.name}`] || ''}
                  onChange={handleChange}
                  {...inputProps}
                />
              )}

              {meta[item.name]?.touched && meta[item.name]?.error && (
                <FormErrorMessage message="Required" />
              )}
            </div>
          </div>
        ))}

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
