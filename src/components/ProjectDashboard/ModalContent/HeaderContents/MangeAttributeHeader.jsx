import React from 'react';
import { useSelector } from 'react-redux';

export default function MangeAttributeHeader() {
  const selectedLayer = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  return <h3>{`${selectedLayer?.name} Attributes`}</h3>;
}
