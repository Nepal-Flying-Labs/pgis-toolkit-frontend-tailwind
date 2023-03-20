/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ErrorSection from './ErrorSection';
import EditFeatureSection from './EditFeatureSection';

export default function Errors() {
  const sidebarContent = useSelector(
    state => state.dataCleaning.manualFix.sidebarContent,
  );
  const divRef = useRef(null);
  const scrollValue = useRef(null);

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

  useEffect(() => {
    if (sidebarContent !== 'error-list') return;
    divRef.current.scrollTo(0, scrollValue.current);
  }, [sidebarContent]);

  const handleScroll = event => {
    if (sidebarContent !== 'error-list') return;
    scrollValue.current = event.currentTarget.scrollTop;
  };

  return (
    <div
      className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col
        naxatw-gap-3 naxatw-h-[calc(100vh-6.2rem-7.6rem)]"
      onScroll={handleScroll}
      ref={divRef}
    >
      {getContent()}
    </div>
  );
}
