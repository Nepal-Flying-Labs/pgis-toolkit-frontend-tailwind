import React from 'react';
import '../AppLoader/styles.css';

export default function MapLoader() {
  return (
    <div
      className="col-3 naxatw-h-full naxatw-flex naxatw-items-center 
        naxatw-justify-center naxatw-bg-grey-100"
    >
      <div className="snippet" data-title="dot-pulse">
        <div className="stage">
          <h4 className="naxatw-text-grey-700">Loading Data...</h4>
        </div>
      </div>
    </div>
  );
}
