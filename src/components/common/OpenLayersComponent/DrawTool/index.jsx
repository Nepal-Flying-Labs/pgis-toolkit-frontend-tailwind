/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Collection } from 'ol';
import { Snap } from 'ol/interaction';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { getUid } from 'ol/util';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Tooltip from '@Components/common/Tooltip';
import { defaultStyles, getStyles, pointTypes } from '../helpers/styleUtils';
import getFeatureGeojson from './helpers/getFeatureGeojson';
import {
  useDrawUtils,
  AddFeature,
  EditFeature,
  DragFeature,
  // RotateFeature,
} from './modules';

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
  enable,
}) {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [modifiedStates, setModifiedStates] = useState([]);
  const [modifiedFeature, setModifiedFeature] = useState(null);
  const layerUid = useRef(null);

  const handleFeatureEdit = useCallback(
    modifiedFeatures => {
      const featureGeojson = getFeatureGeojson(modifiedFeatures[0]);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(modifiedFeatures);
      onChange(featureGeojson);
    },
    [onChange],
  );

  const { select, modify, translate, addInteraction, removeInteraction } =
    useDrawUtils({
      mapInstance: map,
      layerUid,
      source,
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
  }, [map, geojson, zIndex, select, style]);

  // clean up on geojson remove
  useEffect(() => {
    if (!map || enable || !vectorLayer) return;
    select.getFeatures().clear();
    source.clear();
    setDrawType(null);
    map.removeLayer(vectorLayer);
  }, [map, vectorLayer, enable, select]);

  // add snap interaction
  useEffect(() => {
    if (!map || !drawType) return;
    const snapCollection = new Collection([], {
      unique: true,
    });
    setTimeout(() => {
      const layers = map.getLayers();
      layers.forEach(layer => {
        const properties = layer.getProperties();
        if (properties.layerId === 'snaplayer') {
          const features = layer.getSource().getFeatures();
          snapCollection.push(features[0]);
        }
      });
      const snapInteraction = new Snap({
        features: snapCollection,
      });
      map.addInteraction(snapInteraction);
    }, 500);
  }, [map, drawType]);

  const handleAddFeatureClick = () => {
    if (vectorLayer) return;
    const vectorLyr = new VectorLayer({
      source,
      zIndex: zIndex + 1,
      style: (feature, resolution) => getStyles({ style, feature, resolution }),
    });
    layerUid.current = getUid(vectorLyr);
    map.addLayer(vectorLyr);
    setVectorLayer(vectorLyr);
    setDrawType('add-feature');
  };

  const handleDrawEnd = useCallback(
    feature => {
      const featureGeojson = getFeatureGeojson(feature);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(feature);
      setDrawType(null);
      onChange(featureGeojson);
    },
    [onChange],
  );

  const handleDelete = () => {
    source.clear();
    // setModifiedStates((prev) => [...prev, null]);
    setModifiedFeature(null);
    // setDrawType('add-feature');
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
      onError('Please draw feature to save');
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
      className="naxatw-absolute naxatw-py-1 naxatw-px-[1px] naxatw-rounded-lg naxatw-top-24 naxatw-left-4
        naxatw-bg-white naxatw-z-10 naxatw-shadow-3xl naxatw-text-grey-800 naxatw-flex naxatw-flex-col
        naxatw-border naxatw-border-grey-300"
      style={{ display: !enable ? 'none' : '' }}
    >
      <Tooltip content="Add Feature" direction="right">
        <AddFeature
          type={geometryType}
          enable={drawType === 'add-feature'}
          // onClick={() => setDrawType('add-feature')}
          onClick={handleAddFeatureClick}
          onDrawEnd={handleDrawEnd}
          {...props}
        />
      </Tooltip>

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

      {/* {!pointTypes.includes(geometryType) && (
        <Tooltip content="Rotate" direction="right">
          <RotateFeature
            enable={drawType === 'rotate-feature'}
            onClick={() => setDrawType('rotate-feature')}
            {...props}
          />
        </Tooltip>
      )} */}

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

      <Tooltip content="Save" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          onClick={handleSave}
        >
          <i className="material-symbols-outlined">save</i>
        </button>
      </Tooltip>

      <Tooltip content="Cancel" direction="right">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          onClick={onCancel}
        >
          <i className="material-symbols-outlined">close</i>
        </button>
      </Tooltip>
    </div>
  );
}

DrawTool.defaultProps = {
  geojson: null,
  zIndex: 0,
  style: { ...defaultStyles, fillOpacity: 30, fillColor: '#0000ff' },
};

DrawTool.propTypes = {
  geojson: PropTypes.object,
  style: PropTypes.object,
  zIndex: PropTypes.number,
};
