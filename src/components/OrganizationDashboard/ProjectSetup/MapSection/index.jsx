/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
import VectorTileLayer from 'ol/layer/VectorTile';
import {
  VectorLayer as MapVectorLayer,
  VectorTileLayer as MapVectorTileLayer,
} from '@Components/common/OpenLayersComponent/Layers';

import CustomAddFeature from '@Components/common/OpenLayersComponent/CustomLayer/CustomAddFeature';
import Button from '@Components/common/Button/index';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import '@Components/common/OpenLayersComponent/map.css';
import polygonIcon from '@Assets/images/icons8-polygon-80.png';
import { Creators } from '@Actions/organizationDashboard';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Tooltip from '@Components/common/Tooltip/index';
import MaskedLayer from '@Components/common/OpenLayersComponent/CustomLayer/MaskedLayer';

const { setDrawnGeojsonData } = Creators;

const { API_URL } = process.env;

export default function MapSection({
  isDraw,
  geojson,
  locationType,
  formValues,
}) {
  const dispatch = useDispatch();
  const [selectedGeomType, setSelectedGeomType] = useState('');
  const [redraw, setRedraw] = useState(false);
  const [drawComplete, setDrawComplete] = useState(false);
  const [drawnGeojson, setDrawnGeojson] = useState(null);
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

  const handleClick = () => {
    const layers = map.getLayers().getArray();
    const vectorLayer = layers.filter(layer => layer instanceof VectorLayer);
    vectorLayer.forEach(layer => {
      map.removeLayer(layer);
    });
    const vectorTileLayer = layers.filter(
      layer => layer instanceof VectorTileLayer,
    );
    vectorTileLayer.forEach(layer => {
      map.removeLayer(layer);
    });
    setShowLayer(false);
    setDrawnGeojson(false);
    setRedraw(false);
    setDrawComplete(false);
    dispatch(setDrawnGeojsonData(null));
    setTimeout(() => setRedraw(true), 100);
  };

  const handleDelete = () => {
    const layers = map.getLayers().getArray();
    const vectorLayer = layers.filter(layer => layer instanceof VectorLayer);
    vectorLayer.forEach(layer => {
      map.removeLayer(layer);
    });
    const vectorTileLayer = layers.filter(
      layer => layer instanceof VectorTileLayer,
    );
    vectorTileLayer.forEach(layer => {
      map.removeLayer(layer);
    });
    setDrawnGeojson(false);
    setRedraw(false);
    setDrawComplete(false);
    dispatch(setDrawnGeojsonData(null));
    // setTimeout(() => setRedraw(true), 100);
  };

  return (
    <div className="naxatw-w-full naxatw-relative">
      {locationType === 'Custom Draw' && (
        <div className="naxatw-flex naxatw-gap-x-4 naxatw-items-center naxatw-h-[40px] naxatw-my-2 naxatw-absolute naxatw-z-[99999] naxatw-left-5 naxatw-top-14">
          <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-1">
            <Tooltip content="Draw Polygon" direction="right">
              <div
                className="naxatw-p-3 naxatw-h-[40px] naxatw-bg-white naxatw-border naxatw-border-grey-400 naxatw-w-[40px]
                 hover:naxatw-bg-[#F5F5F5] naxatw-rounded-lg naxatw-cursor-pointer"
                onClick={() => {
                  setSelectedGeomType('Polygon');
                  handleClick();
                }}
              >
                <img
                  src={polygonIcon}
                  className="naxatw-w-4 naxatw-h-4"
                  alt="polygon"
                />
              </div>
            </Tooltip>
            <Tooltip content="Draw rectangle" direction="right">
              <MaterialIcon
                name="rectangle"
                className="naxatw-text-icon-sm material-symbols-outlined"
                wrapperClassName={`naxatw-icon-btn !naxatw-pl-2.5 naxatw-icon-btn-sm naxatw-cursor-pointer naxatw-border naxatw-border-grey-400 naxatw-bg-white ${
                  selectedGeomType === 'Box' ? 'naxatw-bg-gray-100' : ''
                }`}
                onIconClick={() => {
                  setSelectedGeomType('Box');
                  handleClick();
                }}
              />
            </Tooltip>
            <Tooltip content="Delete Area" direction="right">
              <MaterialIcon
                name="delete_outline"
                className="naxatw-text-icon-sm material icons naxatw-text-red-500"
                wrapperClassName={`naxatw-icon-btn !naxatw-pl-2.5 naxatw-icon-btn-sm naxatw-cursor-pointer naxatw-border naxatw-border-grey-400 naxatw-bg-white `}
                onIconClick={() => {
                  // setSelectedGeomType('Box');
                  handleDelete();
                }}
              />
            </Tooltip>
          </div>
        </div>
      )}

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
        {/* {formValues?.id &&
          (formValues?.file || project?.location_type === 'Custom Draw') && (
            <MapVectorTileLayer
              url={`${API_URL}projects/project_location_vectortile/{z}/{x}/{y}/?project=${formValues?.id}`}
              authToken={localStorage.getItem('userToken')}
            />
          )} */}

        {projectGeojson &&
          project?.location_type === formValues?.location_type &&
          showLayer && <MaskedLayer geojson={projectGeojson} />}

        {projectGeojson &&
          project?.location_type === formValues?.location_type &&
          showLayer && <MapVectorLayer geojson={projectGeojson} />}

        {drawnGeojson && <MaskedLayer geojson={drawnGeojson} />}

        {locationType === 'Custom Draw' && (
          <CustomAddFeature
            enable={redraw}
            geometryType={selectedGeomType}
            style={{
              ...defaultStyles,
              // lineColor: '#000000',
              lineOpacity: 100,
              fillColor: '#2C675A',
              fillOpacity: 0,
              lineThickness: 2,
            }}
            onDrawFinish={geojsonx => {
              setDrawComplete(true);
              setRedraw(false);
              setDrawnGeojson(geojsonx);
              const wktString = stringify(geojsonx);
              dispatch(setDrawnGeojsonData(wktString));
            }}
          />
        )}
      </MapComponent>
    </div>
  );
}
