import React from 'react';
import { useSelector } from 'react-redux';

export default function ViewLayerAttributeHeader() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);

  return <h3>{selectedLayer?.name}</h3>;
}
