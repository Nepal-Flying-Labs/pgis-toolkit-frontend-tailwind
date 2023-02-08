/* eslint-disable react/prop-types */
import React from 'react';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';

export default function Legend({ legendData }) {
  return (
    <div id="map-legend">
      <h6 className="naxatw-text-primary-400 naxatw-font-bold">LEGEND</h6>
      <div
        id="map-legend-data"
        className="naxatw-flex naxatw-flex-col naxatw-flex-wrap"
      >
        {legendData.map(data => (
          <div
            key={data.id}
            className="naxatw-flex naxatw-items-center naxatw-mt-2 naxatw-pointer-events-none"
          >
            <LegendItem
              styles={{ ...data.style, geometryType: data.geom_type }}
              className="naxatw-mr-2"
            />
            <label
              htmlFor={data.id}
              className="naxatw-text-grey-800 naxatw-text-body-lg"
            >
              {data.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
