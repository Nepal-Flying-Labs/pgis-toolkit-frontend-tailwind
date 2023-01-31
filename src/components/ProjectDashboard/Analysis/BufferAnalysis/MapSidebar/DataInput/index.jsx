/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { analysisHeaderHeight } from '@src/constants';
import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar/index';
import Select from '@Components/common/Select/index';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import Chip from '@Components/common/Chip';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';

const {
  setDataInputState,
  applyBufferAnalysisRequest,
  handleCheckbox,
  copyFeaturesRequest,
} = Creators;

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
  const { projectId } = useParams();

  const originPointType = useSelector(
    state => state.bufferAnalysis.dataInput?.originPointType,
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

  const poiLayers = useSelector(state => state.bufferAnalysis.poiLayers);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.APPLY_BUFFER_ANALYSIS_REQUEST]),
  );

  const handleApply = () => {
    if (!originGeojson || !bufferRadius || !outputName) {
      dispatch(
        toastActions.error({
          message: 'Please input all the required fields!',
        }),
      );
      return;
    }

    const originData = originGeojson.map(
      origin => origin.geojson.geometry.coordinates,
    );

    const selectedPOI = poiLayers
      .filter(item => item.checked)
      .map(item => item.id);

    const payloadData = {
      origins: originData,
      dissolve_output: dissolveOutput,
      radius: bufferRadius,
      name: outputName,
      project: projectId,
      pois: selectedPOI,
      type: 'buffer',
    };
    const poiLayersIds = poiLayers
      .filter(layer => layer.checked)
      .map(layer => layer.id);
    dispatch(copyFeaturesRequest(poiLayersIds));
    dispatch(applyBufferAnalysisRequest(payloadData));
  };

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
                  className="!naxatw-w-fit "
                  label={
                    originGeojson && originGeojson.length > 0
                      ? 'Add new point'
                      : 'Starting Point'
                  }
                  iconLeft="location_on"
                  active={drawPoint}
                  onClick={() => {
                    dispatch(
                      setDataInputState({
                        drawPoint: !drawPoint,
                      }),
                    );
                  }}
                />
                <div
                  className={`naxatw-mt-2 ${
                    originGeojson ? 'naxatw-bg-[#ffffff73]' : ''
                  } naxatw-p-2 naxatw-rounded-[20px] naxatw-py-1 naxatw-max-h-[100px] naxatw-w-[333px] naxatw-flex naxatw-flex-wrap naxatw-overflow-y-scroll scrollbar`}
                >
                  {originGeojson &&
                    originGeojson.map(origin => (
                      <Chip
                        className="!naxatw-bg-white "
                        key={origin.id}
                        label={origin.name}
                        iconClassName="material-symbols-outlined"
                        iconLeft="location_on"
                        onClick={() => {
                          const newData = originGeojson.filter(
                            origins => origins.id !== origin.id,
                          );
                          dispatch(
                            setDataInputState({
                              originGeojson: newData,
                            }),
                          );
                        }}
                      />
                    ))}
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
                  min="1.0"
                  max="5000.0"
                  step={0.1}
                  value={bufferRadius || ''}
                  onChange={e => {
                    const { value } = e.target;
                    if (value < 1 && value > 5000) return;
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
                Dissolve Output (optional)
              </label>
            </div>
          </div>
        </Container>

        <Container>
          <label className="naxatw-label">POI</label>
          <div
            className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg
              naxatw-overflow-y-auto scrollbar naxatw-h-[11.25rem] naxatw-bg-white"
          >
            <ul>
              {poiLayers?.map(item => (
                <li
                  key={item.id}
                  role="presentation"
                  className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                      hover:naxatw-bg-grey-100 naxatw-flex naxatw-items-center"
                  onClick={() => {}}
                >
                  <input
                    id={item.id}
                    type="checkbox"
                    className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4
                        naxatw-accent-grey-800 naxatw-cursor-pointer"
                    checked={item.checked}
                    onChange={e => {
                      const { id, checked } = e.target;
                      dispatch(
                        handleCheckbox({
                          stateName: 'poiLayers',
                          id,
                          checked,
                        }),
                      );
                    }}
                  />
                  <LegendItem
                    styles={item.style}
                    className="naxatw-mr-2"
                    size="21px"
                  />
                  <label htmlFor={item.id} className="naxatw-cursor-pointer">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
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
          isLoading={loading}
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
