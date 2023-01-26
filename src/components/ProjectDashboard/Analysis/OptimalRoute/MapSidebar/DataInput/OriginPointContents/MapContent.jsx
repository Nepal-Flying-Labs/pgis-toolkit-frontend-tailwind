/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import {
  destinationPointColor,
  startingPointColor,
} from '@src/constants/analysis';
import IconButton from '@Components/common/IconButton';
import Chip from '../../Chip';

const { setDataInputState } = Creators;

function getGeojsonCoordinates(geojson) {
  const {
    coordinates: [lat, lng],
  } = geojson.geometry;
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  return `${latitude}, ${longitude}`;
}

const drawPointData = [
  {
    label: 'Draw Starting Point',
    value: 'start',
    icon: 'radio_button_checked',
  },
  {
    label: 'Draw Destination Point',
    value: 'destination',
    icon: 'radio_button_checked',
  },
];

export default function MapContent() {
  const drawPointType = useSelector(
    state => state.routeAnalysis.dataInput.drawPointType,
  );
  const startGeojson = useSelector(
    state => state.routeAnalysis.dataInput.startGeojson,
  );
  const destinationGeojson = useSelector(
    state => state.routeAnalysis.dataInput.destinationGeojson,
  );
  const dispatch = useDispatch();

  return (
    <div className="naxatw-flex naxatw-select-none">
      <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-between naxatw-text-grey-600 naxatw-py-1">
        <i className="material-icons naxatw-text-lg">radio_button_unchecked</i>
        <div className="naxatw-w-8 naxatw-border-t-2 naxatw-border-dashed naxatw-border-grey-600 naxatw-rotate-90" />
        <i className="material-symbols-outlined naxatw-text-lg">place</i>
      </div>
      <div className="naxatw-flex-1 naxatw-space-y-2">
        {drawPointData.map(({ label, value, icon }) => (
          <Chip
            key={value}
            className={`!naxatw-w-full ${
              (value === 'start' && startGeojson) ||
              (value === 'destination' && destinationGeojson)
                ? '!naxatw-bg-white'
                : ''
            }`}
            label={
              value === 'start' && startGeojson
                ? getGeojsonCoordinates(startGeojson)
                : value === 'destination' && destinationGeojson
                ? getGeojsonCoordinates(destinationGeojson)
                : label
            }
            iconLeft={icon}
            iconStyle={{
              color:
                value === 'start' && startGeojson
                  ? startingPointColor
                  : value === 'destination' && destinationGeojson
                  ? destinationPointColor
                  : '',
            }}
            active={drawPointType === value}
            onClick={() => {
              if (drawPointType) return;
              dispatch(
                setDataInputState({
                  drawPointType: value,
                }),
              );
            }}
          />
        ))}
      </div>
      <div className="naxatw-ml-1 naxatw-flex naxatw-flex-col naxatw-justify-center">
        <IconButton
          name="swap_vert"
          onClick={() => {
            dispatch(
              setDataInputState({
                startGeojson: destinationGeojson,
                destinationGeojson: startGeojson,
              }),
            );
          }}
        />
      </div>
    </div>
  );
}
