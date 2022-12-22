/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import { Draw, Modify, Select } from 'ol/interaction';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';

import '@Components/common/OpenLayersComponent/map.css';

const { API_URL } = process.env;

export default function MapCard({ isDraw, geojson }) {
  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  return (
    <div className="naxatw-w-full">
      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: 'calc(100vh - 250px)',
        }}
      >
        <LayerSwitcherControl />
        <Scalebar />
        {geojson && <VectorLayer geojson={geojson} zoomToLayer />}
      </MapComponent>
    </div>
  );
}
