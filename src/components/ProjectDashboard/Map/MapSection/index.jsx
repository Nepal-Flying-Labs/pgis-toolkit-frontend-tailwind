/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import { mapStateSelector } from '@Selectors/projectDashboard';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { projectHeaderHeight } from '@src/constants';
import '@Components/common/OpenLayersComponent/map.css';

const { API_URL } = process.env;

export default function MapSection() {
  const mapState = useSelector(mapStateSelector);
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
          height: `calc(100vh - ${projectHeaderHeight})`,
        }}
      >
        <LayerSwitcherControl />

        <Scalebar />
        {mapState.map(item => {
          return item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${API_URL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              style={item?.style || { ...defaultStyles }}
            />
          ) : (
            ''
          );
        })}
      </MapComponent>
    </div>
  );
}
