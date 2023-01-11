import React from 'react';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

export default function OptimalRoute() {
  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
