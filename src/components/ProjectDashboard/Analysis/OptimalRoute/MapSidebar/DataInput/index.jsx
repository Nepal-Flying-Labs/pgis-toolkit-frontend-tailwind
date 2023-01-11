import React from 'react';
import Chip from '../Chip';

const modeOfTransportData = [
  { label: 'Drive', value: 'drive', icon: 'directions_car' },
  { label: 'Cycle', value: 'cycle', icon: 'directions_bike' },
  { label: 'Walk', value: 'walk', icon: 'directions_walk' },
];

const originPointData = [
  { label: 'Search', value: 'search', icon: 'search' },
  { label: 'Map', value: 'map', icon: 'map' },
  { label: 'Layer', value: 'layer', icon: 'format_list_bulleted' },
];

export default function DataInput() {
  return (
    <div className="naxatw-space-y-5">
      <div className="naxatw-space-y-2">
        <p className="naxatw-text-body-btn naxatw-text-grey-900">
          Mode of Transport
        </p>
        <div className="naxatw-flex naxatw-space-x-2">
          {modeOfTransportData.map(({ label, value, icon }) => (
            <Chip
              key={value}
              active={value === 'drive'}
              label={label}
              iconClassName="material-symbols-outlined"
              iconLeft={icon}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="naxatw-space-y-2">
        <p className="naxatw-text-body-btn naxatw-text-grey-900">
          Origin & Destination Point
        </p>
        <div className="naxatw-flex naxatw-space-x-2">
          {originPointData.map(({ label, value, icon }) => (
            <Chip
              key={value}
              active={value === 'layer'}
              label={label}
              iconClassName="material-symbols-outlined"
              iconLeft={icon}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
