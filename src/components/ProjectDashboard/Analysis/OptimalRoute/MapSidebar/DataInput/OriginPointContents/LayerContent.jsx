/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import IconButton from '@Components/common/IconButton';
import Select from '@Components/common/Select';
import { poiLayersSelector } from '@Selectors/analysis';
import {
  startingPointColor,
  destinationPointColor,
} from '@src/constants/analysis';
import Chip from '@Components/common/Chip';

const { setAnalysisState } = AnalysisCreators;
const { setDataInputState } = RouteAnalysisCreators;
const { toggleModal } = CommonCreators;

export default function LayerContent() {
  const poiLayers = useSelector(poiLayersSelector);
  const startingPoint = useSelector(
    state => state.routeAnalysis.dataInput.startingPoint,
  );
  const destinationPoint = useSelector(
    state => state.routeAnalysis.dataInput.destinationPoint,
  );
  const dispatch = useDispatch();

  const handleSelect = (selectedItem, type) => {
    dispatch(toggleModal('select-layer-feature'));
    dispatch(
      setAnalysisState({
        selectedLayer: selectedItem,
      }),
    );
    dispatch(
      setDataInputState({
        selectedLayerType: type,
      }),
    );
  };

  return (
    <div className="naxatw-flex naxatw-select-none">
      <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-between naxatw-text-grey-600 naxatw-py-1">
        <i className="material-icons naxatw-text-lg">radio_button_unchecked</i>
        <div className="naxatw-w-8 naxatw-border-t-2 naxatw-border-dashed naxatw-border-grey-600 naxatw-rotate-90" />
        <i className="material-symbols-outlined naxatw-text-lg">place</i>
      </div>
      <div className="naxatw-flex-1 naxatw-space-y-2">
        {startingPoint?.geojson ? (
          <Chip
            className={`!naxatw-w-full ${
              startingPoint?.geojson || destinationPoint?.geojson
                ? '!naxatw-bg-white'
                : ''
            }`}
            label={startingPoint?.name}
            iconLeft="radio_button_checked"
            iconStyle={{
              color: startingPoint?.geojson ? startingPointColor : '',
            }}
            onClick={() => {
              dispatch(
                setDataInputState({
                  startingPoint: null,
                }),
              );
            }}
          />
        ) : (
          <Select
            placeholder="Select Origin Layer"
            style={{ height: '40px' }}
            options={poiLayers}
            labelKey="name"
            valueKey="id"
            onChange={selectedItem =>
              handleSelect(selectedItem, 'startingPoint')
            }
          />
        )}
        {destinationPoint?.geojson ? (
          <Chip
            className={`!naxatw-w-full ${
              destinationPoint?.geojson || destinationPoint?.geojson
                ? '!naxatw-bg-white'
                : ''
            }`}
            label={destinationPoint?.name}
            iconLeft="radio_button_checked"
            iconStyle={{
              color: destinationPoint?.geojson ? destinationPointColor : '',
            }}
            onClick={() => {
              dispatch(
                setDataInputState({
                  destinationPoint: null,
                }),
              );
            }}
          />
        ) : (
          <Select
            placeholder="Select Destination Layer"
            style={{ height: '40px' }}
            options={poiLayers}
            labelKey="name"
            valueKey="id"
            onChange={selectedItem =>
              handleSelect(selectedItem, 'destinationPoint')
            }
          />
        )}
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
