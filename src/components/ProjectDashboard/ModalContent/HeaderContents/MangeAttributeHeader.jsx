import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function MangeAttributeHeader() {
  const { tabname } = useParams();
  const selectedLayer = useSelector(
    tabname === 'manage-data'
      ? state => state.projectDashboard.data.manageData.selectedData
      : state => state.projectMap.selectedLayer,
  );

  return <h3>{`${selectedLayer?.name} Attributes`}</h3>;
}
