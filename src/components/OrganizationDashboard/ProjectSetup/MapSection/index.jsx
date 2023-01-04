/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stringify } from 'wkt';
import { transformExtent, fromLonLat } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import VectorLayer from 'ol/layer/Vector';
import { VectorLayer as MapVectorLayer } from '@Components/common/OpenLayersComponent/Layers';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import AddFeature from '@Components/common/OpenLayersComponent/CustomLayer/AddFeature';
import Button from '@Components/common/Button/index';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import '@Components/common/OpenLayersComponent/map.css';
import { Creators } from '@Actions/organizationDashboard';

const { setDrawnGeojsonData } = Creators;

const { API_URL } = process.env;

export default function MapSection({ isDraw, geojson, locationType }) {
  const dispatch = useDispatch();
  const [redraw, setRedraw] = useState(true);
  const [drawComplete, setDrawComplete] = useState(false);

  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );

  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  // zoom to project location on initial map load
  useEffect(() => {
    if (!map || !Object.keys(project).length > 0) return;
    const bbox = project?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
    }
  }, [map, project]);

  const handleClick = () => {
    const layers = map.getLayers().getArray();
    const vectorLayer = layers.filter(layer => layer instanceof VectorLayer);
    vectorLayer.forEach(layer => {
      map.removeLayer(layer);
    });
    setRedraw(false);
    setDrawComplete(false);
    dispatch(setDrawnGeojsonData(null));
    setTimeout(() => setRedraw(true), 100);
  };

  return (
    <div className="naxatw-w-full">
      {locationType === 'Custom Draw' && (
        <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-h-[40px] naxatw-my-2">
          <span className="naxatw-text-body-lg">
            Select project boundary by drawing on map
          </span>
          {drawComplete && (
            <Button
              className="naxatw-btn-secondary naxatw-btn-noborder"
              onClick={handleClick}
            >
              Redraw
            </Button>
          )}
        </div>
      )}

      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: '400px',
        }}
      >
        <LayerSwitcherControl />
        <Scalebar />
        {geojson && <MapVectorLayer geojson={geojson} zoomToLayer />}
        {project.id && (
          <VectorTileLayer
            url={`${API_URL}projects/project_location_vectortile/{z}/{x}/{y}/?project=${project.id}`}
            authToken={localStorage.getItem('userToken')}
          />
        )}

        {locationType === 'Custom Draw' && (
          <AddFeature
            enable={redraw}
            geometryType="Polygon"
            style={{ ...defaultStyles }}
            onDrawFinish={geojsonx => {
              setDrawComplete(true);
              setRedraw(false);
              const wktString = stringify(geojsonx);
              dispatch(setDrawnGeojsonData(wktString));
            }}
          />
        )}
      </MapComponent>
    </div>
  );
}
