import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/analysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getErrorFeaturesRequest } = Creators;

export default function ManualFix() {
  const selectedLayer = useSelector(state => state.analysis.selectedLayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErrorFeaturesRequest({ layer: selectedLayer.id }));
  }, [dispatch, selectedLayer]);

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
