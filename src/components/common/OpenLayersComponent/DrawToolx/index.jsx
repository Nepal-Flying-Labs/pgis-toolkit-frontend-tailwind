/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import useDrawUtils from '@Components/common/OpenLayersComponent/DrawTool/modules/useDrawUtils';
import Tooltip from '@Components/common/Tooltip/index';
import DragFeature from '../DrawTool/modules/DragFeature';
import EditFeature from '../DrawTool/modules/EditFeature';
import RotateFeature from '../DrawTool/modules/RotateFeature';
import { pointTypes } from '../Legend/LegendItem';

export default function DrawToolx({ map, geometryType, geojson }) {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const { select, modify, translate, addInteraction, removeInteraction } =
    useDrawUtils({
      mapInstance: map,
      layerUid: null,
      // onModifyEnd: handleFeatureEdit,
      // onDragEnd: handleFeatureEdit,
    });

  useEffect(() => {
    if (!map) return;
    const features = new GeoJSON().readFeatures(geojson, {
      featureProjection: get('EPSG:3857'),
    });
    const source = new VectorSource();
    source.addFeatures(features);
    const vectorLyr = new VectorLayer({
      source,
      zIndex: 100,
    });
    map.addLayer(vectorLyr);
    addInteraction(select);
    addInteraction(modify);
    // addInteraction(select);
    // addInteraction(modify);
  }, [map, geojson, addInteraction, select, modify]);

  const props = {
    select,
    modify,
    translate,
    addInteraction,
    removeInteraction,
    vectorLayer,
    source: vectorLayer?.getSource(),
  };

  return (
    <div
      className="naxatw-absolute naxatw-py-1 naxatw-px-[1px] naxatw-rounded-lg naxatw-top-28 naxatw-left-4
        naxatw-bg-white naxatw-z-10 naxatw-shadow-3xl naxatw-text-grey-800 naxatw-flex naxatw-flex-col
        naxatw-border naxatw-border-grey-300"
      style={{ display: !geojson ? 'none' : '' }}
    >
      <Tooltip content="Drag" direction="right">
        <DragFeature
          enable={drawType === 'drag-feature'}
          // onClick={() => setDrawType('drag-feature')}
          {...props}
        />
      </Tooltip>

      {!pointTypes.includes(geometryType) && (
        <Tooltip content="Edit" direction="right">
          <EditFeature
            enable={drawType === 'edit-feature'}
            // onClick={() => setDrawType('edit-feature')}
            {...props}
          />
        </Tooltip>
      )}

      <Tooltip content="Delete" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Delete"
          // onClick={handleDelete}
        >
          <i className="material-icons">delete_outline</i>
        </button>
      </Tooltip>

      <Tooltip content="Undo" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          // onClick={handleUndo}
        >
          <i className="material-icons">undo</i>
        </button>
      </Tooltip>
    </div>
  );
}
