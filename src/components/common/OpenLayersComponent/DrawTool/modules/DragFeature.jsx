/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

export default function DragFeature({
  onClick,
  enable,
  select,
  translate,
  addInteraction,
  removeInteraction,
}) {
  useEffect(() => {
    if (enable) {
      addInteraction(select);
      addInteraction(translate);
    } else {
      removeInteraction(select);
      removeInteraction(translate);
    }
  }, [addInteraction, removeInteraction, enable, translate, select]);

  return (
    <button
      type="button"
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
      onClick={onClick}
    >
      <i className="material-symbols-outlined">open_with</i>
    </button>
  );
}
