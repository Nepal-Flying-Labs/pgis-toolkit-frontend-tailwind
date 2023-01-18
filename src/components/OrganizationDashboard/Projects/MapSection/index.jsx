import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import '@Components/common/OpenLayersComponent/map.css';
import { Creators } from '@Actions/organizationDashboard';

const { setZoomToLayer } = Creators;

const { API_URL } = process.env;

export default function MapSection() {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.organizationDashboard.projects);
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const hideSidebar = useSelector(
    state => state.organizationDashboard.hideSidebar,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  const zoomToLayer = useSelector(
    state => state.organizationDashboard.zoomToLayer,
  );

  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  // update map size on sidebar toggle
  useEffect(() => {
    if (!map) return () => {};
    const timer = setTimeout(() => {
      map.updateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map, hideSidebar]);

  // zoom to project location on initial map load
  useEffect(() => {
    if (!map || !organizationDetail) return;
    const bbox = organizationDetail?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 3500,
        constrainResolution: true,
      });
    }
  }, [map, organizationDetail]);

  // zoom to layer id
  useEffect(() => {
    if (!map || !zoomToLayer) return;
    const bbox = zoomToLayer?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 3500,
        constrainResolution: true,
      });
    }
    dispatch(setZoomToLayer(null));
  }, [dispatch, map, zoomToLayer]);

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
