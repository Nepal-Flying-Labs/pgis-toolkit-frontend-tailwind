/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
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
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
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

export default function MapExport() {
  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });

  // useEffect(() => {
  //   if (!map) return;
  //   async function drawMap() {
  //     const mapElement = document.getElementById('ol-map');
  //     const sidebarElement = document.getElementById('sidebar-export');
  //     const { width: mapWidth } = mapElement.getBoundingClientRect();
  //     const { width: sidebarWidth } = sidebarElement.getBoundingClientRect();
  //     const mapFinalWidth =
  //       (mapWidth / (mapWidth + sidebarWidth)) * dims[selectedDim][0];
  //     const mapFinalHeight = dims[selectedDim][1];
  //     const mapCanvas = await exportMap(map, {
  //       title: '',
  //       layout: 'landscape',
  //       pageSize: selectedDim,
  //       resolution: '150',
  //       legend: true,
  //       northArrow: true,
  //       scaleBar: true,
  //       dims: {
  //         ...dims,
  //         [selectedDim]: [mapFinalWidth, mapFinalHeight],
  //       },
  //     });
  //     const sidebarCanvas = await html2canvas(sidebarElement, {
  //       scale: getScale(),
  //     });
  //     const finalCanvas = document.createElement('canvas');
  //     const width = Math.round((dims[selectedDim][0] * dpi) / 25.4);
  //     const height = Math.round((dims[selectedDim][1] * dpi) / 25.4);
  //     finalCanvas.width = width;
  //     finalCanvas.height = height;
  //     const ctx = finalCanvas.getContext('2d');
  //     ctx.drawImage(mapCanvas, 0, 0);
  //     ctx.drawImage(sidebarCanvas, mapCanvas.width, 0);
  //     finalCanvas.toBlob(blob => {
  //       const file = new File([blob], 'map.png', {
  //         type: 'image/png',
  //       });
  //       saveAs(file);
  //     });
  //   }
  //   setTimeout(() => {
  //     drawMap();
  //   }, 11000);
  // }, [map]);

  return (
    <div className="naxatw-bg-grey-300 naxatw-w-full naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
      <div className="naxatw-bg-white naxatw-w-[56rem] naxatw-h-[36rem] naxatw-flex">
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
