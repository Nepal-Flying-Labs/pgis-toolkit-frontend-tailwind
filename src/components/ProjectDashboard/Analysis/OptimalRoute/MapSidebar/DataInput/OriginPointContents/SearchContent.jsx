/* eslint-disable no-nested-ternary */
import React from 'react';
import { point } from '@turf/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import IconButton from '@Components/common/IconButton';
import SearchOSM from '@Components/common/SearchOSM';

const { setDataInputState } = Creators;

export default function SearchContent() {
  const startingPoint = useSelector(
    state => state.routeAnalysis.dataInput.startingPoint,
  );
  const destinationPoint = useSelector(
    state => state.routeAnalysis.dataInput.destinationPoint,
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
        <SearchOSM
          isSmall
          placeholder="Starting Point"
          value={startingPoint}
          onSelect={selectedItem => {
            const geojson = point(selectedItem.value);
            dispatch(
              setDataInputState({
                startingPoint: { ...selectedItem, name: '', geojson },
              }),
            );
          }}
        />
        <SearchOSM
          isSmall
          placeholder="Destination Point"
          value={destinationPoint}
          onSelect={selectedItem => {
            const geojson = point(selectedItem.value);
            dispatch(
              setDataInputState({
                destinationPoint: { ...selectedItem, name: '', geojson },
              }),
            );
          }}
        />
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
