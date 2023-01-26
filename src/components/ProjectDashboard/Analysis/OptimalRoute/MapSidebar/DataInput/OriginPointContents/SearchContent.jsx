/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import IconButton from '@Components/common/IconButton';
import SearchOSM from '@Components/common/SearchOSM';

const { setDataInputState } = Creators;

export default function SearchContent() {
  const startGeojson = useSelector(
    state => state.routeAnalysis.dataInput.startGeojson,
  );
  const destinationGeojson = useSelector(
    state => state.routeAnalysis.dataInput.destinationGeojson,
  );
  const [startingPointInput, setStartingPointInput] = useState('');
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
          value={startingPointInput}
          onChange={e => setStartingPointInput(e.target.value)}
        />
        <SearchOSM isSmall placeholder="Destination Point" />
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
