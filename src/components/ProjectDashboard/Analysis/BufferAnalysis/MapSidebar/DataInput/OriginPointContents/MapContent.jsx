import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/bufferAnalysis';
import Chip from '@Components/common/Chip';
import Button from '@Components/common/Button/index';

const { setDataInputState } = Creators;

const MapContent = () => {
  const dispatch = useDispatch();
  const drawPoint = useSelector(
    state => state.bufferAnalysis.dataInput.drawPoint,
  );

  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );
  return (
    <div>
      <Button
        className="hover:!naxatw-bg-white !naxatw-w-fit naxatw-btn naxatw-btn-secondary naxatw-btn-noborder"
        iconLeft="location_on"
        // active={drawPoint}
        onClick={() => {
          dispatch(
            setDataInputState({
              drawPoint: !drawPoint,
            }),
          );
        }}
      >
        <span className="naxatw-text-body-lg naxatw-text-inherit">
          {originGeojson && originGeojson.length > 0
            ? 'Add new point'
            : 'Starting Point'}
        </span>
      </Button>
      <div
        className={`naxatw-mt-2 ${
          originGeojson ? 'naxatw-bg-[#ffffff73]' : ''
        } naxatw-p-2 naxatw-rounded-[20px] naxatw-py-1 naxatw-max-h-[100px] naxatw-flex naxatw-flex-wrap naxatw-overflow-y-scroll scrollbar naxatw-gap-1`}
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
};

export default MapContent;
