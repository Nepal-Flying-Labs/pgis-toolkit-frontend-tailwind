/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import Select from '@Components/common/Select';
import { mapStateSelector } from '@Selectors/analysis';

const { setDataInputState } = BufferAnalysisCreators;

export default function LayerContent() {
  const mapState = useSelector(mapStateSelector);
  const selectedLayer = useSelector(
    state => state.bufferAnalysis.dataInput.selectedLayer,
  );

  //   const selectedOriginPointType = useSelector(
  //     state => state.routeAnalysis.dataInput.selectedOriginPointType,
  //   );
  const dispatch = useDispatch();

  const handleSelect = selectedItem => {
    // dispatch(toggleModal('select-layer-feature'));
    dispatch(
      setDataInputState({
        selectedLayer: selectedItem,
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
          options={mapState}
          labelKey="name"
          valueKey="id"
          onChange={selectedItem => handleSelect(selectedItem)}
          selected={selectedLayer?.name}
        />
      </div>
    </div>
  );
}
