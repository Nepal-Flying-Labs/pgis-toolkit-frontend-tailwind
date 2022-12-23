/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

export default function EditFeature({
  onClick,
  enable,
  select,
  modify,
  addInteraction,
  removeInteraction,
}) {
  useEffect(() => {
    if (enable) {
      addInteraction(select);
      addInteraction(modify);
    } else {
      removeInteraction(select);
      removeInteraction(modify);
    }
  }, [addInteraction, removeInteraction, enable, modify, select]);

  return (
    <button
      type="button"
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
      onClick={onClick}
    >
      <i className="material-icons">timeline</i>
    </button>
  );
}
