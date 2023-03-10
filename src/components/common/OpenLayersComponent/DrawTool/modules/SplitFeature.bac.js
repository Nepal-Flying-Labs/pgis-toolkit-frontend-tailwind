/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Draw, Select } from 'ol/interaction';
import getFeaturesGeojson from '../helpers/getFeaturesGeojson';
import splitPolygon from '../helpers/splitPolygon';
import splitLineString from '../helpers/splitLineString';
import { getGeometryType } from '../../helpers/styleUtils';

const supportedTypes = ['Polygon', 'LineString'];

export default function SplitFeature({
  addInteraction,
  removeInteraction,
  onClick,
  enable,
  features,
  onSuccess,
  vectorLayer,
  drawSource,
}) {
  const [oldFeature, setOldFeature] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const drawInstance = useMemo(
    () =>
      new Draw({
        features,
        type: 'LineString',
      }),
    [features],
  );

  const select = useMemo(
    () =>
      new Select({
        wrapX: false,
        filter: feature => {
          const geometryType = feature.getGeometry().getType();
          return supportedTypes.includes(geometryType);
        },
      }),
    [],
  );

  useEffect(() => {
    if (enable && !selectedFeature) {
      addInteraction(select);
    } else {
      removeInteraction(select);
    }
  }, [addInteraction, removeInteraction, select, enable, selectedFeature]);

  const onFeatureSelect = useCallback(
    ({ selected }) => {
      const geojson = getFeaturesGeojson(selected);
      setSelectedFeature(geojson);
      setOldFeature(selected[0]);
      const layer = select.getLayer(selected[0]);
      const source = layer.getSource();
    },
    [select],
  );

  useEffect(() => {
    select.on('select', onFeatureSelect);
  }, [select, onFeatureSelect]);

  useEffect(() => {
    if (!selectedFeature || !features) return;
    if (enable) {
      addInteraction(drawInstance);
    } else {
      removeInteraction(drawInstance);
    }
  }, [
    selectedFeature,
    addInteraction,
    removeInteraction,
    features,
    enable,
    drawInstance,
  ]);

  const handleDrawEnd = useCallback(
    ({ feature }) => {
      const featureGeometryType = getGeometryType(selectedFeature);
      console.log(featureGeometryType, 'featureGeometryTypex');
      const geojson = getFeaturesGeojson(feature);
      console.log(geojson, 'geojsonx');
      const splittedFeature =
        featureGeometryType === 'LineString'
          ? splitLineString(selectedFeature, geojson)
          : splitPolygon(selectedFeature, geojson);
      const properties = oldFeature.getProperties();
      const newFeature = new GeoJSON().readFeatures(splittedFeature, {
        featureProjection: get('EPSG:3857'),
      });
      const source = vectorLayer.getSource();
      source.removeFeature(oldFeature);
      source.addFeatures(newFeature);
      removeInteraction(drawInstance);
      setOldFeature(null);
      setSelectedFeature(null);
      onSuccess(splittedFeature);
      drawSource.clear();
      drawInstance.un('drawend', handleDrawEnd);
    },
    [
      drawInstance,
      drawSource,
      selectedFeature,
      oldFeature,
      onSuccess,
      removeInteraction,
      vectorLayer,
    ],
  );

  useEffect(() => {
    if (!selectedFeature || !oldFeature) return;

    console.log('addedx');
    drawInstance.on('drawend', handleDrawEnd);
  }, [selectedFeature, oldFeature, drawInstance, handleDrawEnd]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
    >
      <i className="material-symbols-outlined">cut</i>
    </button>
  );
}
