import React from 'react';
import './styles.css';

export default function AppLoader() {
  return (
    <div>
      <h3
        className="naxatw-fixed naxatw-inset-0 naxatw-flex naxatw-justify-center
          naxatw-items-center naxatw-font-normal"
      >
        <div className="col-3">
          <div className="snippet" data-title="dot-pulse">
            <div className="stage">
              <div className="dot-pulse" />
            </div>
          </div>
        </div>
      </h3>
    </div>
  );
}
