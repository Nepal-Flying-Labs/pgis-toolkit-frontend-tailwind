import React from 'react';
import { useSelector } from 'react-redux';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

export default function Projects() {
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  return (
    <div
      className="naxatw-flex"
      style={{
        height: `calc(100vh - ${projectHeaderHeight}px)`,
      }}
    >
      <MapSidebar />

      <MapSection />
    </div>
  );
}
