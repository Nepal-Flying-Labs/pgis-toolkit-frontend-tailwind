/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { Creators as CommonCreators } from '@Actions/common';
import IconButton from '@Components/common/IconButton';
import Select from '@Components/common/Select';
import { pointLayersSelector } from '@Selectors/analysis';

const { setAnalysisState } = AnalysisCreators;
const { toggleModal } = CommonCreators;

export default function LayerContent() {
  const pointLayers = useSelector(pointLayersSelector);
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
        <Select
          placeholder="Select Origin Layer"
          style={{ height: '40px' }}
          options={pointLayers}
          labelKey="name"
          valueKey="id"
          onChange={selectedItem => {
            dispatch(toggleModal('select-layer-feature'));
            dispatch(
              setAnalysisState({
                selectedLayer: selectedItem,
              }),
            );
          }}
        />
        <Select
          placeholder="Select Destination Layer"
          style={{ height: '40px' }}
          options={pointLayers}
          labelKey="name"
          valueKey="id"
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
