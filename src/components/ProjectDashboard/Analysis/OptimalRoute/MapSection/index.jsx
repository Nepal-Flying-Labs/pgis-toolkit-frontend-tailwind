/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import {
  Creators as RouteAnalysisCreators,
  Types,
} from '@Actions/routeAnalysis';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/CustomLayerSwitcher';
import Spinner from '@Components/common/Spinner';
import { checkIfLoading } from '@Utils/loaderSelector';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool';
import { drawPointStyles } from '@src/constants/analysis';
import { analysisHeaderHeight } from '@src/constants';

const { setDataInputState } = RouteAnalysisCreators;

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const drawPointType = useSelector(
    state => state.routeAnalysis.dataInput.drawPointType,
  );
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECT_GEOJSON_REQUEST]),
  );
  const dispatch = useDispatch();

  return (
    <div className="naxatw-w-full naxatw-relative">
      {isMapDataLoading && (
        <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
          <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
            <h5 className="">Loading</h5>
            <Spinner className="naxatw-w-6 naxatw-h-6 naxatw-fill-primary-400" />
          </span>
        </div>
      )}

      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - ${analysisHeaderHeight})`,
        }}
      >
        <LayerSwitcherControl />

        <CustomLayerSwitcher />

        <DrawTool
          enable={!!drawPointType}
          // geojson={featureGeojson}
          geometryType="Point"
          zIndex={100}
          style={drawPointStyles}
          onChange={geojson => {
            const { coordinates } = geojson.geometry;
            dispatch(
              setDataInputState({
                [drawPointType === 'start'
                  ? 'startCoordinates'
                  : 'destinationCoordinates']: coordinates,
              }),
            );
          }}
        />

        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
