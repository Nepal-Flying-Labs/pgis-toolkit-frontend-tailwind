/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import { Creators } from '@Actions/projectDashboard';
import { mapStateSelector } from '@Selectors/projectDashboard';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { projectHeaderHeight } from '@src/constants';
import '@Components/common/OpenLayersComponent/map.css';

const { API_URL } = process.env;

const { setZoomToLayerId } = Creators;

export default function MapSection() {
  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const mapState = useSelector(mapStateSelector);
  const zoomToLayerId = useSelector(
    state => state.projectDashboard.zoomToLayerId,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map || !zoomToLayerId) return;
    const layer = mapState.find(item => item.id === zoomToLayerId);
    const bbox = layer?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 700,
        constrainResolution: true,
      });
    }
    dispatch(setZoomToLayerId(null));
  }, [dispatch, map, mapState, zoomToLayerId]);

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
