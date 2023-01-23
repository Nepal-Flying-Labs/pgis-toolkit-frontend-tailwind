import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import { startPointStyles } from '@src/constants/analysis';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import toastActions from '@Actions/toast';
import { analysisHeaderHeight } from '@src/constants';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool/index';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';

import '@Components/common/OpenLayersComponent/map.css';

const { setDataInputState } = BufferAnalysisCreators;

export default function MapSection() {
  const dispatch = useDispatch();
  const drawPoint = useSelector(
    state => state.bufferAnalysis.dataInput.drawPoint,
  );
  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );

  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  return (
    <div className="naxatw-w-full naxatw-relative">
      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - ${analysisHeaderHeight})`,
        }}
      >
        <DrawTool
          enable={drawPoint}
          // geojson={featureGeojson}
          geometryType="Point"
          selectedDrawType="add-feature"
          zIndex={10}
          style={{ ...startPointStyles }}
          onSave={geojson => {
            console.log(geojson, 'geojson');
            dispatch(
              setDataInputState({
                originGeojson: originGeojson
                  ? [...originGeojson, geojson]
                  : [geojson],
                drawPoint: true,
              }),
            );
          }}
          onError={message => {
            dispatch(toastActions.error({ message }));
          }}
          onCancel={() => {
            dispatch(
              setDataInputState({
                drawPoint: false,
              }),
            );
          }}
        />
        <LayerSwitcherControl />
        <Scalebar />
      </MapComponent>
    </div>
  );
}
