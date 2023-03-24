/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

export default function EditFeature({
  onClick,
  enable,
  modify,
  addInteraction,
  removeInteraction,
}) {
  useEffect(() => {
    if (enable) {
      // addInteraction(select);
      addInteraction(modify);
      // addInteraction(snap);
    } else {
      // removeInteraction(select);
      removeInteraction(modify);
      // removeInteraction(snap);
    }
  }, [addInteraction, removeInteraction, enable, modify]);

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
