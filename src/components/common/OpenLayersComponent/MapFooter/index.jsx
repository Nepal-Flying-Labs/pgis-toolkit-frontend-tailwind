/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Attribution, ScaleLine } from 'ol/control';
import Spinner from '@Components/common/Spinner';

function scaleControl() {
  const control = new ScaleLine({
    units: 'metric',
    target: document.getElementById('map-scalebar'),
  });
  return control;
}

function getAttribution() {
  const attribution = new Attribution({
    collapsible: false,
    target: document.getElementById('layer-attribution'),
  });
  return attribution;
}

export default function MapFooter({ map, loading = false }) {
  useEffect(() => {
    if (!map) return;
    map.addControl(getAttribution());
    map.addControl(scaleControl());
  }, [map]);

  return (
    <div className="naxatw-absolute naxatw-bottom-0 naxatw-z-10 naxatw-bg-white naxatw-w-full naxatw-h-10 naxatw-flex naxatw-items-center naxatw-px-5 naxatw-py-3">
      <div className="naxatw-flex naxatw-gap-7 map-footer">
        <p>USAFIRI</p>
        {loading && <Spinner className="naxatw-fill-primary-400" />}
        <span id="layer-attribution" />
      </div>

      <div id="map-scalebar" />
    </div>
  );
}
