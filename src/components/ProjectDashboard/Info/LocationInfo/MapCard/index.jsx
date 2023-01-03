/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { transformExtent, fromLonLat } from 'ol/proj';

import { Draw, Modify, Select } from 'ol/interaction';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';

import '@Components/common/OpenLayersComponent/map.css';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';

const { API_URL } = process.env;

export default function MapCard({ isDraw, geojson }) {
  const info = useSelector(state => state.projectDashboard.info.details);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  // zoom to project location on initial map load
  useEffect(() => {
    if (!map || !info) return;
    const bbox = info?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
    }
  }, [map, info]);

  return (
    <div className="naxatw-w-full naxatw-h-full">
      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - 175px)`,
        }}
      >
        <LayerSwitcherControl />
        <Scalebar />
        {info.id && (
          <VectorTileLayer
            url={`${API_URL}projects/project_location_vectortile/{z}/{x}/{y}/?project=${info.id}`}
            authToken={localStorage.getItem('userToken')}
          />
        )}
      </MapComponent>
    </div>
  );
}
