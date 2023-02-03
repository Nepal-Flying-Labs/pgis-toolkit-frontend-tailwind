/* eslint-disable no-nested-ternary */
import React from 'react';
import { point } from '@turf/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import IconButton from '@Components/common/IconButton';
import SearchOSM from '@Components/common/SearchOSM';
import {
  startingPointColor,
  destinationPointColor,
} from '@src/constants/analysis';

const { setDataInputState } = Creators;

export default function SearchContent() {
  const startingPoint = useSelector(
    state => state.routeAnalysis.dataInput.startingPoint,
  );
  const destinationPoint = useSelector(
    state => state.routeAnalysis.dataInput.destinationPoint,
  );
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const selectedOriginPointType = useSelector(
    state => state.routeAnalysis.dataInput.selectedOriginPointType,
  );
  const dispatch = useDispatch();

  const isSearchContentSelected = selectedOriginPointType === 'search';

  return (
    <div className="naxatw-flex naxatw-select-none">
      <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-between naxatw-text-grey-600 naxatw-py-1">
        <i className="material-icons naxatw-text-lg">radio_button_unchecked</i>
        <div className="naxatw-w-8 naxatw-border-t-2 naxatw-border-dashed naxatw-border-grey-600 naxatw-rotate-90" />
        <i className="material-symbols-outlined naxatw-text-lg">place</i>
      </div>
      <div className="naxatw-flex-1 naxatw-space-y-1">
        <SearchOSM
          isSmall
          placeholder="Starting Point"
          iconName={
            isSearchContentSelected && startingPoint
              ? 'radio_button_checked'
              : 'search'
          }
          iconStyle={{
            color:
              isSearchContentSelected && startingPoint
                ? startingPointColor
                : '',
          }}
          viewBox={projectDetail?.bbox}
          value={isSearchContentSelected ? startingPoint : null}
          onSelect={selectedItem => {
            if (!selectedItem) {
              dispatch(
                setDataInputState({
                  startingPoint: null,
                }),
              );
            } else {
              const geojson = point(selectedItem.value);
              dispatch(
                setDataInputState({
                  startingPoint: { ...selectedItem, name: '', geojson },
                  destinationPoint: isSearchContentSelected
                    ? destinationPoint
                    : null,
                  selectedOriginPointType: 'search',
                }),
              );
            }
          }}
        />
        <SearchOSM
          isSmall
          placeholder="Destination Point"
          iconName={
            isSearchContentSelected && destinationPoint
              ? 'radio_button_checked'
              : 'search'
          }
          iconStyle={{
            color:
              isSearchContentSelected && destinationPoint
                ? destinationPointColor
                : '',
          }}
          viewBox={projectDetail?.bbox}
          value={isSearchContentSelected ? destinationPoint : null}
          onSelect={selectedItem => {
            if (!selectedItem) {
              dispatch(
                setDataInputState({
                  destinationPoint: null,
                }),
              );
            } else {
              const geojson = point(selectedItem.value);
              dispatch(
                setDataInputState({
                  destinationPoint: { ...selectedItem, name: '', geojson },
                  startingPoint: isSearchContentSelected ? startingPoint : null,
                  selectedOriginPointType: 'search',
                }),
              );
            }
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
