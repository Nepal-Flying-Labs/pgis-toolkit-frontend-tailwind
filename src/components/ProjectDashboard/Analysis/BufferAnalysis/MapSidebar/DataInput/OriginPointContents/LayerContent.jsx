/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import Select from '@Components/common/Select';
import { poiLayersSelector } from '@Selectors/analysis';
import Chip from '@Components/common/Chip';

const { setAnalysisState } = AnalysisCreators;
const { setDataInputState } = BufferAnalysisCreators;
const { toggleModal } = CommonCreators;

export default function LayerContent() {
  const poiLayers = useSelector(poiLayersSelector);
  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );

  //   const selectedOriginPointType = useSelector(
  //     state => state.routeAnalysis.dataInput.selectedOriginPointType,
  //   );
  const dispatch = useDispatch();

  const handleSelect = selectedItem => {
    dispatch(toggleModal('select-layer-feature'));
    dispatch(
      setAnalysisState({
        selectedLayer: selectedItem,
        analysisType: 'bufferAnalysis',
      }),
    );
  };

  //   const isLayerContentSelected = selectedOriginPointType === 'layer';

  return (
    <div className="naxatw-select-none">
      <div className="naxatw-flex-1 naxatw-space-y-2">
        <Select
          className="naxatw-bg-white naxatw-px-2"
          placeholder="Select Origin Layer"
          style={{ height: '40px' }}
          options={poiLayers}
          labelKey="name"
          valueKey="id"
          onChange={selectedItem => handleSelect(selectedItem)}
        />
      </div>
      <div
        className={`naxatw-mt-2 ${
          originGeojson ? 'naxatw-bg-[#ffffff73]' : ''
        } naxatw-p-2 naxatw-rounded-[20px] naxatw-gap-1 naxatw-max-h-[100px] naxatw-flex naxatw-flex-wrap naxatw-overflow-y-scroll scrollbar`}
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
  );
}
