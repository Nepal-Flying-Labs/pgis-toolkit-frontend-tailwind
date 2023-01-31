/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import {
  destinationPointColor,
  startingPointColor,
} from '@src/constants/analysis';
import IconButton from '@Components/common/IconButton';
import getGeojsonCoordinates from '@Utils/getGeojsonCoordinates';
import Chip from '@Components/common/Chip';

const { setDataInputState } = Creators;

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
  const startingPoint = useSelector(
    state => state.routeAnalysis.dataInput.startingPoint,
  );
  const destinationPoint = useSelector(
    state => state.routeAnalysis.dataInput.destinationPoint,
  );
  const selectedOriginPointType = useSelector(
    state => state.routeAnalysis.dataInput.selectedOriginPointType,
  );
  const dispatch = useDispatch();

  const isMapContentSelected = selectedOriginPointType === 'map';

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
              (isMapContentSelected &&
                value === 'start' &&
                startingPoint?.geojson) ||
              (isMapContentSelected &&
                value === 'destination' &&
                destinationPoint?.geojson)
                ? '!naxatw-bg-white'
                : ''
            }`}
            label={
              isMapContentSelected &&
              value === 'start' &&
              startingPoint?.geojson
                ? getGeojsonCoordinates(startingPoint?.geojson)
                : isMapContentSelected &&
                  value === 'destination' &&
                  destinationPoint?.geojson
                ? getGeojsonCoordinates(destinationPoint?.geojson)
                : label
            }
            iconLeft={icon}
            iconStyle={{
              color:
                isMapContentSelected &&
                value === 'start' &&
                startingPoint?.geojson
                  ? startingPointColor
                  : isMapContentSelected &&
                    value === 'destination' &&
                    destinationPoint?.geojson
                  ? destinationPointColor
                  : '',
            }}
            active={drawPointType === value}
            onClick={() => {
              if (drawPointType) return;
              dispatch(
                setDataInputState({
                  drawPointType: value,
                  selectedOriginPointType: 'map',
                  startingPoint: isMapContentSelected ? startingPoint : null,
                  destinationPoint: isMapContentSelected
                    ? destinationPoint
                    : null,
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
                startingPoint: destinationPoint,
                destinationPoint: startingPoint,
              }),
            );
          }}
        />
      </div>
    </div>
  );
}
