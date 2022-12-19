import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';

const {
  setProjectMapState,
  getLayerAttributeFieldsRequest,
  postNewLayerFeatureRequest,
} = ProjectMapCreators;

export default function EditFeatureSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const drawnFeatureWkt = useSelector(
    state => state.projectMap.drawnFeatureWkt,
  );
  const individualAttributeData = useSelector(
    state => state.projectMap.individualAttributeData,
  );
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, setValues } = useForm({
    initialValues: {},
    onSubmit: data => {
      const payloadData = {
        layer: selectedLayer.id,
        attributes: data,
        geometry: drawnFeatureWkt,
      };
      dispatch(postNewLayerFeatureRequest(payloadData));
    },
  });

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
    if (!selectedLayer) return;
    dispatch(
      getLayerAttributeFieldsRequest({
        layer: selectedLayer.id,
        check_mandatory: 'True',
      }),
    );
  }, [dispatch, selectedLayer]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-5">
      <div className="naxatw-flex naxatw-items-center">
        <a
          className="naxatw-flex naxatw-p-2"
          onClick={() => {
            dispatch(
              setProjectMapState({
                selectedLayer: null,
                sidebarContent: '',
              }),
            );
          }}
        >
          <MaterialIcon name="arrow_back" />
        </a>
        <h4>{sidebarContent === 'add-feature' ? 'Add' : 'Edit'} Feature</h4>
      </div>

      <div className="naxatw-overflow-auto scrollbar naxatw-h-[32rem] naxatw-flex naxatw-flex-col naxatw-gap-5">
        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Draw Feature</label>
            <Button
              className="naxatw-btn-secondary naxatw-btn-sm"
              onClick={() => {
                if (drawnFeatureWkt) return;
                dispatch(
                  setProjectMapState({
                    drawType: 'add-feature',
                  }),
                );
              }}
            >
              Draw on Map
            </Button>
          </div>
        </div>

        {drawnFeatureWkt && (
          <>
            <div className="naxatw-flex naxatw-items-center">
              <div className="naxatw-w-full naxatw-space-y-2">
                <label className="naxatw-label">Attributes</label>
              </div>
            </div>

            {individualAttributeData.map(item => (
              <div key={item.id} className="naxatw-flex naxatw-items-center">
                <div className="naxatw-w-full naxatw-space-y-2">
                  <label className="naxatw-label">
                    {item.alias || item.name}
                    {item.mandatory ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    className="naxatw-input"
                    name={item.name}
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}

            <div className="naxatw-fixed naxatw-bottom-0 naxatw-w-full naxatw-py-4 naxatw-bg-grey-100">
              <Button
                className="naxatw-btn-primary"
                onClick={handleSubmit}
                // isLoading={loading}
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
