/* eslint-disable no-nested-ternary */
import React from 'react';
import { point } from '@turf/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/bufferAnalysis';
import SearchOSM from '@Components/common/SearchOSM';
import Chip from '@Components/common/Chip';

const { setDataInputState } = Creators;

export default function SearchContent() {
  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );

  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const dispatch = useDispatch();

  return (
    <div className="naxatw-select-none">
      <div className="naxatw-space-y-1">
        <SearchOSM
          isSmall
          placeholder="Origin Point"
          viewBox={projectDetail?.bbox}
          value={null}
          onSelect={selectedItem => {
            const geojson = point(selectedItem.value);
            dispatch(
              setDataInputState({
                originGeojson: originGeojson
                  ? [
                      ...originGeojson,
                      { ...selectedItem, name: selectedItem.label, geojson },
                    ]
                  : [{ ...selectedItem, name: selectedItem.label, geojson }],
                selectedOriginPointType: 'search',
              }),
            );
          }}
        />
        <div
          className={`naxatw-mt-2 ${
            originGeojson ? 'naxatw-bg-[#ffffff73]' : ''
          } naxatw-p-2 naxatw-rounded-[20px] naxatw-py-1 naxatw-gap-1 naxatw-max-h-[100px] naxatw-flex naxatw-flex-wrap naxatw-overflow-y-scroll naxatw-overflow-x-hidden scrollbar`}
        >
          {originGeojson &&
            originGeojson.map(origin => (
              <Chip
                className="!naxatw-bg-white naxatw-w-[200px] naxatw-justify-between"
                key={origin.id}
                label={
                  <p
                    className="naxatw-text-body-lg naxatw-truncate naxatw-w-[100px]"
                    title={origin.name}
                  >
                    {origin.name}
                  </p>
                }
                iconClassName="material-symbols-outlined"
                iconLeft="location_on"
                iconRight="close"
                onIconRightClick={() => {
                  const newData = originGeojson.filter(
                    origins => origins.id !== origin.id,
                  );
                  dispatch(
                    setDataInputState({
                      originGeojson: newData.length > 0 ? newData : null,
                    }),
                  );
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
