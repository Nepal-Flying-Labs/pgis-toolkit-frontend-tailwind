import React from 'react';
import { analysisHeaderHeight } from '@src/constants';
import Button from '@Components/common/Button';
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

const obstaclesData = [
  { id: 1, name: 'Road Accident' },
  { id: 2, name: 'Road Accident' },
  { id: 3, name: 'Road Accident' },
  { id: 4, name: 'Road Accident' },
];

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

function ModeOfTransport() {
  return (
    <Container>
      <label className="naxatw-label">Mode of Transport</label>
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
    </Container>
  );
}

function OriginPoint() {
  return (
    <Container>
      <label className="naxatw-label">Origin & Destination Point</label>
      <div className="naxatw-flex naxatw-space-x-2">
        {originPointData.map(({ label, value, icon }) => (
          <Chip
            key={value}
            active={value === 'map'}
            label={label}
            iconClassName="material-symbols-outlined"
            iconLeft={icon}
            onClick={() => {}}
          />
        ))}
      </div>
    </Container>
  );
}

function Obstacles() {
  return (
    <Container>
      <label className="naxatw-label">Obstacles</label>
      <div
        className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg
          naxatw-overflow-y-auto scrollbar naxatw-h-[11.25rem] naxatw-bg-white"
      >
        <ul>
          {obstaclesData.map(item => (
            <li
              key={item.id}
              role="presentation"
              className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                      hover:naxatw-bg-grey-100 naxatw-flex naxatw-items-center"
              onClick={() => {}}
            >
              <input
                id={item.id}
                type="checkbox"
                className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4
                        naxatw-accent-grey-800 naxatw-cursor-pointer"
                // checked={values.selectedObstacleLayers?.some(
                //   i => i.id === item.id,
                // )}
                onChange={e => {
                  // const { checked } = e.target;
                  // handleChange({
                  //   target: {
                  //     name: 'selectedObstacleLayers',
                  //     value: checked
                  //       ? [...selectedObstacleLayers, item]
                  //       : values.selectedObstacleLayers.filter(
                  //           i => i.id !== item.id,
                  //         ),
                  //   },
                  // });
                }}
              />
              <label htmlFor={item.id} className="naxatw-cursor-pointer">
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default function DataInput() {
  return (
    <div className=" naxatw-h-full">
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar"
        style={{
          maxHeight: `calc(100vh - ${analysisHeaderHeight} - 7.5rem)`,
        }}
      >
        <ModeOfTransport />

        <OriginPoint />

        <Obstacles />

        <Container>
          <label className="naxatw-label">Preferred alternative path</label>
          <input type="number" className="naxatw-input" />
        </Container>

        <Container>
          <label className="naxatw-label">Output Name</label>
          <input type="text" className="naxatw-input" />
        </Container>
      </div>

      <div
        className="naxatw-mt-auto naxatw-flex naxatw-items-center
          naxatw-justify-center naxatw-py-3"
      >
        <Button className="naxatw-btn-primary">Apply</Button>
      </div>
    </div>
  );
}
