import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/dataCleaning';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getErrorFeaturesRequest, getLayerAttributeFieldsRequest } = Creators;

export default function ManualFix() {
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErrorFeaturesRequest({ layer: selectedLayer.id }));
    dispatch(
      getLayerAttributeFieldsRequest({
        layer: selectedLayer.id,
        check_mandatory: 'True',
      }),
    );
  }, [dispatch, selectedLayer]);

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
