import React from 'react';
import { useSelector } from 'react-redux';
import ErrorSection from './ErrorSection';
import EditFeatureSection from './EditFeatureSection';

export default function Errors() {
  const sidebarContent = useSelector(
    state => state.analysis.manualFix.sidebarContent,
  );

  function getContent() {
    switch (sidebarContent) {
      case 'error-list':
        return <ErrorSection />;
      case 'add-feature':
        return <EditFeatureSection />;
      case 'edit-feature':
        return <EditFeatureSection />;

      default:
        return <ErrorSection />;
    }
  }

  return (
    <div
      className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col
        naxatw-gap-3 naxatw-h-[calc(100vh-6.2rem-7.6rem)]"
    >
      {getContent()}
    </div>
  );
}
