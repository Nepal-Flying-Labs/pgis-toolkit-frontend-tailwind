/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { analysisHeaderHeight } from '@src/constants';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar/index';
import Select from '@Components/common/Select/index';
import { Creators } from '@Actions/bufferAnalysis';
import Chip from '../Chip';

const { setBufferAnalysisState } = Creators;

const originPointData = [
  { label: 'Search', value: 'search', icon: 'search' },
  { label: 'Map', value: 'map', icon: 'map' },
  { label: 'Layer', value: 'layer', icon: 'format_list_bulleted' },
];

// const drawPointData = [
//   {
//     label: 'Draw Starting Point',
//     value: 'start',
//     icon: 'radio_button_checked',
//   },
//   {
//     label: 'Draw Destination Point',
//     value: 'destination',
//     icon: 'radio_button_checked',
//   },
// ];

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

export default function DataInput() {
  const dispatch = useDispatch();
  const [originPointType, setOriginPointType] = useState('search');
  return (
    <div className=" naxatw-h-full">
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${analysisHeaderHeight} - 7.5rem)`,
        }}
      >
        <Container>
          <label className="naxatw-label">Origin</label>
          <div className="naxatw-flex naxatw-space-x-2">
            {originPointData.map(({ label, value, icon }) => (
              <Chip
                key={value}
                active={originPointType === value}
                label={label}
                iconClassName="material-symbols-outlined"
                iconLeft={icon}
                onClick={() => {
                  setOriginPointType(value);
                }}
              />
            ))}
          </div>

          <Container>
            {originPointType === 'search' && <Searchbar placeholder="Search" />}
            {originPointType === 'map' && (
              <Searchbar placeholder="Starting Point" />
            )}
            {originPointType === 'layer' && (
              <Container>
                <Select
                  placeholder="Choose Origin Layer"
                  className="naxatw-bg-white naxatw-h-[48px] naxatw-px-3"
                />
                <Searchbar placeholder="Search Feature" />
              </Container>
            )}
          </Container>
        </Container>

        <Container>
          <div>
            <div className="naxatw-space-y-2 ">
              <label className="naxatw-label">Buffer Radius</label>
              <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
                <input
                  type="number"
                  className="naxatw-input"
                  min="1"
                  max="5"
                  placeholder="Buffer Radius"
                />
                <p>Meter</p>
              </div>
            </div>
            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4 naxatw-mt-5 naxatw-p-2">
              <input
                id="dissolve-output"
                type="checkbox"
                className="naxatw-h-4 naxatw-w-4 naxatw-accent-grey-800"
                min="1"
                max="5"
              />
              <label
                htmlFor="dissolve-output"
                className="naxatw-text-body-lg naxatw-text-grey-800"
              >
                Dissolve Output
              </label>
            </div>
          </div>
        </Container>

        <Container>
          <label className="naxatw-label">Output Name</label>
          <input
            type="text"
            className="naxatw-input"
            placeholder="Enter Output Name"
          />
        </Container>
      </div>

      <div
        className="naxatw-mt-auto naxatw-flex naxatw-items-center
          naxatw-justify-center naxatw-py-3"
      >
        <Button
          className="naxatw-btn-primary"
          // isLoading={loading}
          onClick={() => {
            dispatch(
              setBufferAnalysisState({
                activeTab: 'results',
              }),
            );
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
