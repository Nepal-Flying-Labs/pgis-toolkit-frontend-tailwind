/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

export default function DeleteFeature({
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
    <button type="button" title="Delete" onClick={onClick}>
      <i className="material-icons">delete</i>
    </button>
  );
}
