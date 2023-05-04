/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transformExtent, fromLonLat } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import {
  VectorLayer as MapVectorLayer,
  VectorTileLayer as MapVectorTileLayer,
} from '@Components/common/OpenLayersComponent/Layers';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import '@Components/common/OpenLayersComponent/map.css';
import { Creators } from '@Actions/organizationDashboard';

import MaskedLayer from '@Components/common/OpenLayersComponent/CustomLayer/MaskedLayer';

export default function MapSection({
  isDraw,
  geojson,
  locationType,
  formValues,
}) {
  const [showLayer, setShowLayer] = useState(true);

  const fileUploadGeojson = useSelector(
    state => state.organizationDashboard.individualProject.fileUploadGeojson,
  );

  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );

  const projectGeojson = useSelector(
    state => state.organizationDashboard.individualProject.projectGeojson,
  );

  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  // zoom to project location on initial map load
  useEffect(() => {
    if (!map || !Object.keys(formValues)?.length > 0) return;
    const bbox = formValues?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
    }
    if (
      formValues?.location_type === 'File Upload' &&
      !formValues?.file?.existedData
    ) {
      setShowLayer(false);
    }
  }, [map, formValues]);

  return (
    <div className="naxatw-w-full naxatw-relative">
      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: '400px',
          border: '1px solid #F5F5F5',
        }}
      >
        <LayerSwitcherControl />
        <Scalebar />
        {fileUploadGeojson && formValues.location_type === 'File Upload' && (
          <MaskedLayer geojson={fileUploadGeojson} zoomToLayer />
        )}
        {fileUploadGeojson && formValues.location_type === 'File Upload' && (
          <MapVectorLayer geojson={fileUploadGeojson} zoomToLayer />
        )}

        {projectGeojson &&
          project?.location_type === formValues?.location_type &&
          showLayer && <MaskedLayer geojson={projectGeojson} />}

        {projectGeojson &&
          project?.location_type === formValues?.location_type &&
          showLayer && <MapVectorLayer geojson={projectGeojson} />}
      </MapComponent>
    </div>
  );
}
