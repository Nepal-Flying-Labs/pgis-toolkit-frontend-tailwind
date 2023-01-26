/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import VectorTile from 'ol/layer/VectorTile';
import { Creators, Types } from '@Actions/projectMap';
import { mapStateSelector } from '@Selectors/projectMap';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import '@Components/common/OpenLayersComponent/map.css';
import { exportMap } from '@Components/common/OpenLayersComponent/helpers/export-map';

const dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148],
};

const selectedDim = 'a2';

const dpi = 150;

function getScale() {
  return (dpi / 76) * 5;
}

export default function MapExport({setExportMap, setExportMapRef, setExportPaperRef}) {
  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const paperRef = useRef(null)

  useEffect(()=>{
    setExportMap(map)
    setExportMapRef(mapRef.current)
    setExportPaperRef(paperRef.current)
  }, [map, mapRef, paperRef])

  return (
    <div className="naxatw-bg-grey-300 naxatw-w-full naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
      <div ref={paperRef} className="naxatw-bg-white naxatw-w-[56rem] naxatw-h-[36rem] naxatw-flex">
        <div className="naxatw-bg-white naxatw-w-3/4">
          <MapComponent
            ref={mapRef}
            mapInstance={map}
            className="naxatw-w-full naxatw-h-[36rem]"
          >
            <LayerSwitcherControl />
          </MapComponent>
        </div>

        <div id="sidebar-export" className="naxatw-flex naxatw-flex-col">
          <div className="naxatw-px-4 naxatw-py-3 naxatw-bg-grey-100 naxatw-font-bold naxatw-text-[18px] naxatw-leading-[22px] naxatw-text-grey-800">
            Transportation mapping Kenya 2
          </div>
          <div className="naxatw-px-4 naxatw-py-3">
            <p className="naxatw-text-body-sm">LEGEND</p>
          </div>
          <div className="naxatw-mt-auto naxatw-bg-primary-50">
            Exported from USAFIRI
          </div>
        </div>
      </div>
    </div>
  );
}
