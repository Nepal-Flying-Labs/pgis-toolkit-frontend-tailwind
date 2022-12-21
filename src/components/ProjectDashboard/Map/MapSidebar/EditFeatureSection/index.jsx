import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'wkt';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { isEmpty } from '@Utils/commonUtils';

const {
  setProjectMapState,
  getLayerAttributeFieldsRequest,
  postNewLayerFeatureRequest,
  updateFeatureCollectionRequest,
} = ProjectMapCreators;

export default function EditFeatureSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
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
      }),
    );
  };

  const { values, handleChange, handleSubmit, setValues } = useForm({
    initialValues: {},
    onSubmit: (data, isFieldsChanged) => {
      const payloadData = {};
      if (sidebarContent === 'add-feature') {
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
      if (!isEmpty(payloadData)) {
        dispatch(updateFeatureCollectionRequest(editFeatureId, payloadData));
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

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-5">
      <div className="naxatw-flex naxatw-items-center">
        <a className="naxatw-flex naxatw-p-2" onClick={handleCancel}>
          <MaterialIcon name="arrow_back" />
        </a>
        <h4>{sidebarContent === 'add-feature' ? 'Add' : 'Edit'} Feature</h4>
      </div>

      <div className="naxatw-overflow-auto scrollbar naxatw-h-[32rem] naxatw-flex naxatw-flex-col naxatw-gap-5">
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
                  {item.data_type === 'date' ? (
                    <CustomCalendar
                      startDate={new Date()}
                      onChange={date => {
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
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="naxatw-fixed naxatw-bottom-0 naxatw-w-full naxatw-py-4 naxatw-bg-grey-100">
              <Button
                className="naxatw-btn-primary"
                onClick={handleSubmit}
                isLoading={isPosting}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
