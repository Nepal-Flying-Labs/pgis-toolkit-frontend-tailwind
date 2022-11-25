import React from 'react';
import { projectHeaderHeight } from '@src/constants';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

export default function Projects() {
  return (
    <div
      className={`naxatw-h-[calc(100vh-${projectHeaderHeight})] naxatw-flex`}
    >
      <MapSidebar />

      <MapSection />
    </div>
  );
}
