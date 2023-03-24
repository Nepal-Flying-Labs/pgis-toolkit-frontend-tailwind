/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useCallback } from 'react';
import { get, transform } from 'ol/proj';
import { point } from '@turf/helpers';
import GeoJSON from 'ol/format/GeoJSON';
import { Select } from 'ol/interaction';
import getFeaturesGeojson from '../helpers/getFeaturesGeojson';
// import splitPolygon from "../helpers/splitPolygon";
import splitLineString from '../helpers/splitLineString';
// import { getGeometryType } from "../../helpers/styleUtils";

const supportedTypes = ['Polygon', 'LineString'];

export default function SplitFeature({
  addInteraction,
  removeInteraction,
  onClick,
  enable,
  // features,
  // onSuccess,
  vectorLayer,
  // geojson,
  onFeatureSplit,
}) {
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
    if (enable) {
      addInteraction(select);
    } else {
      removeInteraction(select);
    }
  }, [addInteraction, removeInteraction, select, enable]);

  const onFeatureSelect = useCallback(
    e => {
      // const { selected } = e;
      const lonlat = transform(
        e.mapBrowserEvent.coordinate,
        'EPSG:3857',
        'EPSG:4326',
      );
      const layerFeatures = vectorLayer.getSource().getFeatures();
      const geojson = getFeaturesGeojson(layerFeatures);
      const splitterGeojson = point(lonlat);
      const splitx = splitLineString(geojson, splitterGeojson);
      if (splitx.features.length === 1) return; // no split case
      const vectorSource = vectorLayer.getSource();
      vectorSource.clear();
      const features = new GeoJSON().readFeatures(splitx, {
        featureProjection: get('EPSG:3857'),
      });
      features.forEach(feat => {
        feat.setId(feat.ol_uid);
      });
      vectorSource.addFeatures(features);
      onFeatureSplit(splitx);
    },
    [vectorLayer, onFeatureSplit],
  );

  useEffect(() => {
    if (!vectorLayer) return;
    select.on('select', onFeatureSelect);
  }, [select, onFeatureSelect, vectorLayer]);

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
