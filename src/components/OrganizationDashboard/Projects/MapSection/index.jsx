import React from 'react';
import { useSelector } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import '@Components/common/OpenLayersComponent/map.css';

const { API_URL } = process.env;

export default function MapSection() {
  const projects = useSelector(state => state.organizationDashboard.projects);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
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
          height: `calc(100vh - ${projectHeaderHeight}px)`,
        }}
      >
        <LayerSwitcherControl />

        <Scalebar />

        {projects?.results?.map(item => (
          <VectorTileLayer
            key={item.id}
            url={`${API_URL}projects/project_location_vectortile/{z}/{x}/{y}/?project=${item.id}`}
            authToken={localStorage.getItem('userToken')}
          />
        ))}
      </MapComponent>
    </div>
  );
}
