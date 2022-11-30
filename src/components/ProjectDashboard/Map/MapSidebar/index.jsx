import React from 'react';
import { useSelector } from 'react-redux';
import EditFeatureSection from './EditFeatureSection';
import LayerSection from './LayerSection';

export default function MapSidebar() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5"
      style={{
        minWidth: '30rem',
      }}
    >
      {!selectedLayer ? <LayerSection /> : <EditFeatureSection />}
    </div>
  );
}
