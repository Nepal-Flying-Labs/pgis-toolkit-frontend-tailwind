import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/analysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { getErrorFeaturesRequest } = Creators;

export default function ManualFix() {
  const manualFixLayerId = useSelector(
    state => state.analysis.manualFixLayerId,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getErrorFeaturesRequest({ layer: manualFixLayerId }));
  }, [dispatch, manualFixLayerId]);

  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
