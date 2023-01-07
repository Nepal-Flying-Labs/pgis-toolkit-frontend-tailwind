/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Draw, Snap } from 'ol/interaction';
import { lineTypes, pointTypes } from '../../helpers/styleUtils';

export default function AddFeature({
  onClick,
  vectorLayer,
  type,
  enable,
  addInteraction,
  removeInteraction,
  onDrawEnd,
}) {
  const drawInstance = useMemo(
    () =>
      new Draw({
        source: vectorLayer?.getSource(),
        type,
      }),
    [vectorLayer, type],
  );

  const snap = useMemo(
    () => new Snap({ source: vectorLayer?.getSource() }),
    [vectorLayer],
  );

  useEffect(() => {
    if (!vectorLayer || !enable) return;
    addInteraction(drawInstance);
    addInteraction(snap);
  }, [addInteraction, vectorLayer, type, enable, drawInstance, snap]);

  useEffect(() => {
    if (enable) return;
    removeInteraction(drawInstance);
    removeInteraction(snap);
  }, [removeInteraction, enable, drawInstance, snap]);

  // on draw end
  useEffect(() => {
    drawInstance.on('drawend', e => {
      const { feature } = e;
      onDrawEnd(feature);
    });
  }, [drawInstance, onDrawEnd]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
    >
      <i className="material-symbols-outlined">
        {pointTypes.includes(type)
          ? 'location_on'
          : lineTypes.includes(type)
          ? 'line_end'
          : 'square'}
      </i>
    </button>
  );
}
