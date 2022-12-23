/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { getUid } from 'ol/util';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Tooltip from '@Components/common/Tooltip';
import { defaultStyles, getStyles } from '../helpers/styleUtils';
import getFeatureGeojson from './helpers/getFeatureGeojson';
import {
  useDrawUtils,
  AddFeature,
  EditFeature,
  DragFeature,
  RotateFeature,
} from './modules';
import { pointTypes } from '../Legend/LegendItem';

const source = new VectorSource();

export default function DrawTool({
  map,
  geojson,
  style,
  zIndex,
  geometryType,
  onChange = () => {},
  onSave = () => {},
  onCancel,
  onError,
}) {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [modifiedStates, setModifiedStates] = useState([]);
  const [modifiedFeature, setModifiedFeature] = useState(null);
  const layerUid = useRef(null);

  const handleFeatureEdit = useCallback(modifiedFeatures => {
    const featureGeojson = getFeatureGeojson(modifiedFeatures[0]);
    setModifiedStates(prev => [...prev, featureGeojson]);
    setModifiedFeature(modifiedFeatures);
    onChange(featureGeojson);
  }, []); // eslint-disable-line

  const { select, modify, translate, addInteraction, removeInteraction } =
    useDrawUtils({
      mapInstance: map,
      layerUid,
      onModifyEnd: handleFeatureEdit,
      onDragEnd: handleFeatureEdit,
    });

  // add geojson for edit feature
  useEffect(() => {
    if (!map || !geojson) return;
    const features = new GeoJSON().readFeatures(geojson, {
      featureProjection: get('EPSG:3857'),
    });
    source.addFeatures(features);
    const vectorLyr = new VectorLayer({
      source,
      zIndex: zIndex + 1,
      style: (feature, resolution) => getStyles({ style, feature, resolution }),
    });
    layerUid.current = getUid(vectorLyr);
    map.addLayer(vectorLyr);
    setVectorLayer(vectorLyr);
    select.getFeatures().push(features[0]);
    setModifiedStates([geojson]);
    setModifiedFeature(features[0]);
  }, [map, geojson, zIndex, select]);

  // clean up on geojson remove
  useEffect(() => {
    if (!map || geojson || !vectorLayer) return;
    select.getFeatures().clear();
    source.clear();
    setDrawType(null);
    map.removeLayer(vectorLayer);
  }, [map, vectorLayer, geojson, select]);

  const handleAddFeatureClick = () => {
    if (modifiedFeature !== null) return;
    setDrawType('add-polygon');
  };

  const handleDrawEnd = useCallback(feature => {
    const featureGeojson = getFeatureGeojson(feature);
    setModifiedStates(prev => [...prev, featureGeojson]);
    setModifiedFeature(feature);
    setDrawType(null);
  }, []);

  const handleDelete = () => {
    source.clear();
    // setModifiedStates((prev) => [...prev, null]);
    setModifiedFeature(null);
    setDrawType('add-polygon');
  };

  // on undo click
  const handleUndo = () => {
    if (modifiedStates.length === 1) return;
    source.clear();
    const previousModifiedFeature = modifiedStates[modifiedStates.length - 2];
    source.addFeature(
      new GeoJSON().readFeature(previousModifiedFeature, {
        featureProjection: get('EPSG:3857'),
      }),
    );
    setModifiedStates(prev =>
      prev.filter((_, index) => index < prev.length - 1),
    );
    setModifiedFeature(previousModifiedFeature);
    setDrawType(null);
    const newFeature = source.getFeatures()[0];
    select.getFeatures().push(newFeature);
  };

  // on save click
  const handleSave = () => {
    if (!modifiedFeature) {
      onError('Please draw polygon to save');
      return;
    }
    const lastModifiedFeature = modifiedStates[modifiedStates.length - 1];
    if (!lastModifiedFeature) return;
    onSave(lastModifiedFeature);
  };

  const props = {
    select,
    modify,
    translate,
    addInteraction,
    removeInteraction,
    vectorLayer,
    source,
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
          onClick={() => setDrawType('drag-feature')}
          {...props}
        />
      </Tooltip>

      {!pointTypes.includes(geometryType) && (
        <Tooltip content="Edit" direction="right">
          <EditFeature
            enable={drawType === 'edit-feature'}
            onClick={() => setDrawType('edit-feature')}
            {...props}
          />
        </Tooltip>
      )}

      {!pointTypes.includes(geometryType) && (
        <Tooltip content="Rotate" direction="right">
          <RotateFeature
            enable={drawType === 'rotate-feature'}
            onClick={() => setDrawType('rotate-feature')}
            {...props}
          />
        </Tooltip>
      )}

      <Tooltip content="Delete" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Delete"
          onClick={handleDelete}
        >
          <i className="material-icons">delete_outline</i>
        </button>
      </Tooltip>

      <Tooltip content="Undo" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          onClick={handleUndo}
        >
          <i className="material-icons">undo</i>
        </button>
      </Tooltip>

      {/*
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            title="Save"
            onClick={handleSave}
          >
            <i className="material-symbols-outlined">save</i>
          </button>
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            title="Cancel"
            onClick={onCancel}
          >
            <i className="material-icons">close</i>
          </button>
        */}
    </div>
  );

  // return (
  //   <div className={`toolbar__container ${geojson ? 'visible' : ''}`}>
  //     <div className="toolbar__title">
  //       <h6>Draw Toolbar</h6>
  //     </div>
  //     <div className="toolbar__items">
  //       <AddFeature
  //         type="Polygon"
  //         enable={drawType === 'add-polygon'}
  //         onClick={handleAddFeatureClick}
  //         onDrawEnd={handleDrawEnd}
  //         {...props}
  //       />
  //
  //       <EditFeature
  //         enable={drawType === 'edit-feature'}
  //         onClick={() => setDrawType('edit-feature')}
  //         {...props}
  //       />
  //
  //       <DragFeature
  //         enable={drawType === 'drag-feature'}
  //         onClick={() => setDrawType('drag-feature')}
  //         {...props}
  //       />
  //
  //       <RotateFeature
  //         enable={drawType === 'rotate-feature'}
  //         onClick={() => setDrawType('rotate-feature')}
  //         {...props}
  //       />
  //
  //       <button type="button" title="Delete" onClick={handleDelete}>
  //         <i className="material-icons">delete</i>
  //       </button>
  //
  //       <button type="button" title="Undo" onClick={handleUndo}>
  //         <i className="material-icons">undo</i>
  //       </button>
  //     </div>
  //
  //     <div className="toolbar__footer">
  //       <button type="button" title="Save" onClick={handleSave}>
  //         Save
  //       </button>
  //       <button type="button" title="Cancel" onClick={onCancel}>
  //         Cancel
  //       </button>
  //     </div>
  //   </div>
  // );
}

DrawTool.defaultProps = {
  zIndex: 0,
  style: { ...defaultStyles, fillOpacity: 30, fillColor: '#0000ff' },
};

DrawTool.propTypes = {
  geojson: PropTypes.object.isRequired,
  style: PropTypes.object,
  zIndex: PropTypes.number,
};
