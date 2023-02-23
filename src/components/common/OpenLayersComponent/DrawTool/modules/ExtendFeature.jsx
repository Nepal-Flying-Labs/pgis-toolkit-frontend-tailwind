/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Draw } from 'ol/interaction';
import { lineTypes, pointTypes } from '../../helpers/styleUtils';

export default function ExtendFeature({
  onClick,
  vectorLayer,
  type,
  enable,
  addInteraction,
  removeInteraction,
  onDrawEnd,
  map,
}) {
  const drawInstance = useMemo(
    () =>
      new Draw({
        source: vectorLayer?.getSource(),
        type: pointTypes.includes(type)
          ? 'Point'
          : lineTypes.includes(type)
          ? 'LineString'
          : 'Polygon',
      }),
    [vectorLayer, type],
  );

  useEffect(() => {
    if (!vectorLayer || !enable || !drawInstance) {
      removeInteraction(drawInstance);
      return;
    }
    addInteraction(drawInstance);
  }, [
    addInteraction,
    removeInteraction,
    vectorLayer,
    type,
    enable,
    drawInstance,
  ]);

  // useEffect(() => {
  //   if (!enable || !drawInstance) return;
  //   drawInstance.extend(vectorLayer?.getSource()?.getFeatures()?.[0]);
  // }, [enable, drawInstance, vectorLayer]);

  // useEffect(() => {
  //   if (enable) return;
  //   removeInteraction(drawInstance);
  // }, [removeInteraction, enable, drawInstance]);

  // on draw end
  useEffect(() => {
    function handleDraw(e) {
      const { feature } = e;
      vectorLayer.getSource().addFeature(feature);
      const finalFeature = vectorLayer.getSource().getFeatures();
      onDrawEnd(finalFeature);
    }
    drawInstance.on('drawend', handleDraw);
    return () => {
      drawInstance.un('drawend', handleDraw);
    };
  }, [drawInstance, onDrawEnd, vectorLayer]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
    >
      <i className="material-symbols-outlined">polyline</i>
    </button>
  );
}
