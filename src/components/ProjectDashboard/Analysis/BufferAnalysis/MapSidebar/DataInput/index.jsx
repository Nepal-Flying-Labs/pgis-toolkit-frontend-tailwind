/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { analysisHeaderHeight } from '@src/constants';
import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select/index';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import Chip from '@Components/common/Chip';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import IconButton from '@Components/common/IconButton/index';
import { isEmpty } from '@Utils/commonUtils';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import MapContent from './OriginPointContents/MapContent';
import SearchContent from './OriginPointContents/SearchContent';
import LayerContent from './OriginPointContents/LayerContent';

const {
  setDataInputState,
  applyBufferAnalysisRequest,
  handleCheckbox,
  copyFeaturesRequest,
  setBufferAnalysisState,
} = Creators;

const { setSelectedInfo } = AnalysisCreators;

const radiusOptions = [
  { id: 1, label: 'Meter', value: 'meter' },
  { id: 2, label: 'Kilometer', value: 'kilometer' },
];

const originPointData = [
  { label: 'Search', value: 'search', icon: 'search' },
  { label: 'Map', value: 'map', icon: 'map' },
  { label: 'Layer', value: 'layer', icon: 'format_list_bulleted' },
];

function getOriginPointsContent(content) {
  switch (content) {
    case 'search':
      return <SearchContent />;
    case 'map':
      return <MapContent />;
    case 'layer':
      return <LayerContent />;
    default:
      return '';
  }
}

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

export default function DataInput() {
  const [error, setError] = useState([]);
  const [radiusUnit, setRadiusUnit] = useState('meter');
  const dispatch = useDispatch();
  const { projectId, analysisType } = useParams();

  const originPointType = useSelector(
    state => state.bufferAnalysis.dataInput?.originPointType,
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

  const selectedInfo = useSelector(state => state.analysis.selectedInfo);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.APPLY_BUFFER_ANALYSIS_REQUEST]),
  );

  const handleApply = () => {
    const selectedPOI = poiLayers
      .filter(item => item.checked)
      .map(item => item.id);
    if (
      !originGeojson ||
      !bufferRadius ||
      !outputName ||
      (isEmpty(selectedPOI) && analysisType === 'proximity-analysis')
    ) {
      const errors = [];
      if (!originGeojson) {
        errors.push('originGeojson');
      }
      if (!bufferRadius) {
        errors.push('bufferRadius');
      }
      if (!outputName) {
        errors.push('outputName');
      }
      if (isEmpty(selectedPOI) && analysisType === 'proximity-analysis') {
        errors.push('poi');
      }
      setError(errors);
      dispatch(
        toastActions.error({
          message: 'Please input all the required fields!',
        }),
      );
      return;
    }
    setError([]);

    const originData = originGeojson.map(
      origin => origin.geojson.geometry.coordinates,
    );

    const selectedPOIName = poiLayers
      .filter(item => item.checked)
      .map(item => item.name);

    const payloadData = {
      origins: originData,
      dissolve_output: dissolveOutput,
      radius: radiusUnit === 'kilometer' ? bufferRadius * 1000 : bufferRadius,
      name: outputName,
      project: projectId,
      pois: selectedPOI,
      type: 'buffer',
    };
    const poiLayersIds = poiLayers
      .filter(layer => layer.checked)
      .map(layer => layer.id);
    dispatch(copyFeaturesRequest(poiLayersIds));
    dispatch(
      setBufferAnalysisState({
        inputQuery: { ...payloadData, selectedPOIName, analysisType },
      }),
    );
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
          <label className="naxatw-label naxatw-flex naxatw-items-center">
            Origin
            <div
              onMouseOver={() => dispatch(setSelectedInfo('origin'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          </label>
          {analysisType === 'proximity-analysis' ? (
            <>
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

              <Container>{getOriginPointsContent(originPointType)}</Container>
            </>
          ) : (
            <>
              {/* <div className="naxatw-flex naxatw-space-x-2">
                <Chip
                  key="layer"
                  active="layer"
                  label="Layer"
                  iconClassName="material-symbols-outlined"
                  iconLeft="format_list_bulleted"
                />
              </div> */}

              <Container>
                <LayerContent />
              </Container>
            </>
          )}
          {error.includes('originGeojson') && (
            <FormErrorMessage message="Required Field" />
          )}
        </Container>

        <Container>
          <div>
            <div className="naxatw-space-y-2 ">
              <label className="naxatw-label naxatw-flex naxatw-items-center">
                {analysisType === 'buffer-analysis'
                  ? 'Buffer Radius'
                  : 'Proximity Radius'}
                <div
                  onMouseOver={() => {
                    if (selectedInfo === 'bufferRadius') return;
                    dispatch(setSelectedInfo('bufferRadius'));
                  }}
                  // onMouseOut={() => dispatch(setSelectedInfo(null))}
                  onBlur={() => {}}
                  onFocus={() => {}}
                >
                  <IconButton
                    className="material-symbols-outlined naxatw-text-[1.2rem]"
                    name="info"
                    title="Info"
                    // onClick={() => dispatch(setSelectedInfo('result'))}
                  />
                </div>
              </label>
              <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
                <input
                  type="number"
                  className="naxatw-input naxatw-basis-2/4"
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
                <div className="naxatw-basis-2/4">
                  <Select
                    className="naxatw-bg-white naxatw-h-[48px] naxatw-px-2"
                    options={radiusOptions}
                    dataKey="label"
                    selected={
                      radiusOptions.filter(opt => opt.value === radiusUnit)[0]
                        .label
                    }
                    onChange={item => setRadiusUnit(item.value)}
                  />
                </div>
              </div>
              {error.includes('bufferRadius') && (
                <FormErrorMessage message="Required Field" />
              )}
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
                className="naxatw-text-body-lg naxatw-text-grey-800 naxatw-flex naxatw-items-center"
              >
                Dissolve Output (optional)
              </label>
              <div
                onMouseOver={() => dispatch(setSelectedInfo('dissolveOutput'))}
                // onMouseOut={() => dispatch(setSelectedInfo(null))}
                onBlur={() => {}}
                onFocus={() => {}}
              >
                <IconButton
                  className="material-symbols-outlined naxatw-text-[1.2rem]"
                  name="info"
                  title="Info"
                  // onClick={() => dispatch(setSelectedInfo('result'))}
                />
              </div>
            </div>
          </div>
        </Container>

        {analysisType === 'proximity-analysis' && (
          <Container>
            <label className="naxatw-label naxatw-flex naxatw-items-center">
              POI{' '}
              <div
                onMouseOver={() => dispatch(setSelectedInfo('poi'))}
                // onMouseOut={() => dispatch(setSelectedInfo(null))}
                onBlur={() => {}}
                onFocus={() => {}}
              >
                <IconButton
                  className="material-symbols-outlined naxatw-text-[1.2rem]"
                  name="info"
                  title="Info"
                  // onClick={() => dispatch(setSelectedInfo('result'))}
                />
              </div>
            </label>
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
            {error.includes('poi') && (
              <FormErrorMessage message="Required Field" />
            )}
          </Container>
        )}

        <Container>
          <label className="naxatw-label naxatw-flex naxatw-items-center">
            Output Name{' '}
            <div
              onMouseOver={() => dispatch(setSelectedInfo('result'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          </label>
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
          {error.includes('outputName') && (
            <FormErrorMessage message="Required Field" />
          )}
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
