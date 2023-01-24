/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analysisHeaderHeight } from '@src/constants';
// import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar/index';
import Select from '@Components/common/Select/index';
import { Creators } from '@Actions/bufferAnalysis';
import Chip from '../Chip';

const { setBufferAnalysisState, setDataInputState } = Creators;

const originPointData = [
  { label: 'Search', value: 'search', icon: 'search' },
  { label: 'Map', value: 'map', icon: 'map' },
  { label: 'Layer', value: 'layer', icon: 'format_list_bulleted' },
];

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

export default function DataInput() {
  const dispatch = useDispatch();

  const originPointType = useSelector(
    state => state.bufferAnalysis.dataInput.originPointType,
  );
  const drawPoint = useSelector(
    state => state.bufferAnalysis.dataInput.drawPoint,
  );

  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );

  const bufferRadius = useSelector(
    state => state.bufferAnalysis.dataInput.bufferRadius,
  );

  const outputName = useSelector(
    state => state.bufferAnalysis.dataInput.outputName,
  );

  const dissolveOutput = useSelector(
    state => state.bufferAnalysis.dataInput.dissolveOutput,
  );

  // const handleApply = () => {
  //   if (!originGeojson || !bufferRadius || !outputName) {
  //     dispatch(
  //       toastActions.error({
  //         message: 'Please input all the required fields!',
  //       }),
  //     );
  //     return;
  //   }

  //   const payloadData = {
  //     origins,
  //     dissolve_output:dissolveOutput,
  //     radius:bufferRadius,
  //     name: outputName,
  //     project: projectId,
  //     type: 'buffer',
  //   };
  //   dispatch(applyBufferAnalysisRequest(payloadData));
  // };

  return (
    <div className=" naxatw-h-full">
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${analysisHeaderHeight} - 7.5rem)`,
        }}
      >
        <Container>
          <label className="naxatw-label">Origin</label>
          <div className="naxatw-flex naxatw-space-x-2">
            {originPointData.map(({ label, value, icon }) => (
              <Chip
                key={value}
                active={originPointType === value}
                label={label}
                iconClassName="material-symbols-outlined"
                iconLeft={icon}
                onClick={() => {
                  dispatch(
                    setDataInputState({
                      originPointType: value,
                    }),
                  );
                }}
              />
            ))}
          </div>

          <Container>
            {originPointType === 'search' && <Searchbar placeholder="Search" />}
            {originPointType === 'map' && (
              <div>
                <Chip
                  className="!naxatw-w-full !naxatw-bg-white "
                  label="Starting Point"
                  iconLeft="search"
                  active={drawPoint}
                  onClick={() => {
                    dispatch(
                      setDataInputState({
                        drawPoint: !drawPoint,
                      }),
                    );
                  }}
                />
                <div className="naxatw-mt-2 naxatw-max-h-[100px] naxatw-overflow-y-auto naxatw-space-y-1 scrollbar">
                  {originGeojson &&
                    originGeojson.map(geojson => {
                      const { coordinates } = geojson.geometry;
                      return (
                        <Chip
                          key={geojson}
                          label={`${parseFloat(coordinates[0]).toFixed(
                            3,
                          )}-${parseFloat(coordinates[1]).toFixed(3)}`}
                          iconClassName="material-symbols-outlined"
                          iconLeft="location_on"
                          // onClick={() => {
                          //   dispatch(
                          //     setDataInputState({
                          //       originPointType: value,
                          //     }),
                          //   );
                          // }}
                        />
                      );
                    })}
                </div>
              </div>
            )}
            {originPointType === 'layer' && (
              <Container>
                <Select
                  placeholder="Choose Origin Layer"
                  className="naxatw-bg-white naxatw-h-[48px] naxatw-px-3"
                />
                <Searchbar placeholder="Search Feature" />
              </Container>
            )}
          </Container>
        </Container>

        <Container>
          <div>
            <div className="naxatw-space-y-2 ">
              <label className="naxatw-label">Buffer Radius</label>
              <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
                <input
                  type="number"
                  className="naxatw-input"
                  min="1"
                  max="5"
                  step={0.1}
                  value={bufferRadius || ''}
                  onChange={e => {
                    const { value } = e.target;
                    if (value < 1 && value > 5) return;
                    dispatch(
                      setDataInputState({
                        bufferRadius: value,
                      }),
                    );
                  }}
                  placeholder="Buffer Radius"
                />
                <p>Meter</p>
              </div>
            </div>
            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4 naxatw-mt-5 naxatw-p-2">
              <input
                id="dissolve-output"
                type="checkbox"
                className="naxatw-h-4 naxatw-w-4 naxatw-accent-grey-800"
                checked={dissolveOutput}
                onChange={() => {
                  dispatch(
                    setDataInputState({
                      dissolveOutput: !dissolveOutput,
                    }),
                  );
                }}
              />
              <label
                htmlFor="dissolve-output"
                className="naxatw-text-body-lg naxatw-text-grey-800"
              >
                Dissolve Output
              </label>
            </div>
          </div>
        </Container>

        <Container>
          <label className="naxatw-label">Output Name</label>
          <input
            type="text"
            className="naxatw-input"
            placeholder="Enter Output Name"
            value={outputName}
            onChange={e => {
              dispatch(
                setDataInputState({
                  outputName: e.target.value,
                }),
              );
            }}
          />
        </Container>
      </div>

      <div
        className="naxatw-mt-auto naxatw-flex naxatw-items-center
          naxatw-justify-center naxatw-py-3"
      >
        <Button
          className="naxatw-btn-primary"
          // isLoading={loading}
          onClick={() => {
            dispatch(
              setBufferAnalysisState({
                activeTab: 'results',
              }),
            );
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
