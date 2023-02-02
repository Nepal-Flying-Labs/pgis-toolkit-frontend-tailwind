/* eslint-disable no-nested-ternary */
import React from 'react';
import { point } from '@turf/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/bufferAnalysis';
// import IconButton from '@Components/common/IconButton';
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
  // const selectedOriginPointType = useSelector(
  //   state => state.bufferAnalysis.dataInput.selectedOriginPointType,
  // );
  const dispatch = useDispatch();

  // const isSearchContentSelected = selectedOriginPointType === 'search';

  return (
    <div className="naxatw-select-none">
      <div className="naxatw-space-y-1 naxatw-max-w-[300px]">
        <SearchOSM
          isSmall
          placeholder="Origin Point"
          viewBox={projectDetail?.bbox}
          value={null}
          onSelect={selectedItem => {
            console.log(selectedItem, 'selectedData');
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
          } naxatw-p-2 naxatw-rounded-[20px] naxatw-py-1 naxatw-space-y-1 naxatw-max-h-[100px] naxatw-w-[300px] naxatw-flex naxatw-flex-wrap naxatw-overflow-y-scroll naxatw-overflow-x-hidden scrollbar`}
        >
          {originGeojson &&
            originGeojson.map(origin => (
              <Chip
                className="!naxatw-bg-white "
                key={origin.id}
                label={
                  <p
                    className="naxatw-truncate naxatw-w-[200px]"
                    title={origin.name}
                  >
                    {origin.name}
                  </p>
                }
                iconClassName="material-symbols-outlined"
                iconLeft="location_on"
                onClick={() => {
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
