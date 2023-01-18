import React from 'react';
import { useSelector } from 'react-redux';

export default function ViewRouteAttributeHeader() {
  const selectedAnalysis = useSelector(
    state => state.routeAnalysis.results.selectedAnalysis,
  );

  return <h3>{selectedAnalysis?.name}</h3>;
}
