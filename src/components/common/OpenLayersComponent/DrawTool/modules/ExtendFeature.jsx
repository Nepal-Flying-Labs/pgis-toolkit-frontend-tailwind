/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

export default function ExtendFeature({
  onClick,
  enable,
  select,
  modify,
  snap,
  addInteraction,
  removeInteraction,
}) {
  useEffect(() => {
    if (enable) {
      addInteraction(select);
      addInteraction(modify);
      addInteraction(snap);
    } else {
      removeInteraction(select);
      removeInteraction(modify);
      removeInteraction(snap);
    }
  }, [addInteraction, removeInteraction, enable, modify, select, snap]);

  return (
    <button
      type="button"
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
      onClick={onClick}
    >
      <i className="material-icons">polyline</i>
    </button>
  );
}
