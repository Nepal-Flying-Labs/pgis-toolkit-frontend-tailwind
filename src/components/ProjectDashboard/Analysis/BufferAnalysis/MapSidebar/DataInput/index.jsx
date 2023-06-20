/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { analysisHeaderHeight } from '@src/constants';
import toastActions from '@Actions/toast';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select/index';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import IconButton from '@Components/common/IconButton/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import { selectedRadiusColumnSelector } from '@Selectors/bufferAnalysis';
import LayerContent from './OriginPointContents/LayerContent';

const {
  setDataInputState,
  applyBufferAnalysisRequest,
  copyFeaturesRequest,
  getLayerAttributeFieldsRequest,
  handleRadiusColumnSelect,
} = Creators;

const { setSelectedInfo } = AnalysisCreators;

const radiusOptions = [
  { id: 1, label: 'Meter', value: 'meter' },
  { id: 2, label: 'Kilometer', value: 'kilometer' },
];

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

export default function DataInput() {
  const [error, setError] = useState([]);
  // const [radiusUnit, setRadiusUnit] = useState('meter');
  const dispatch = useDispatch();
  const { projectId, analysisId } = useParams();

  const bufferRadius = useSelector(
    state => state.bufferAnalysis.dataInput.bufferRadius,
  );
  const radiusUnit = useSelector(
    state => state.bufferAnalysis.dataInput.radiusUnit,
  );

  const outputName = useSelector(
    state => state.bufferAnalysis.dataInput.outputName,
  );
  const selectedLayer = useSelector(
    state => state.bufferAnalysis.dataInput.selectedLayer,
  );

  const dissolveOutput = useSelector(
    state => state.bufferAnalysis.dataInput.dissolveOutput,
  );
  const poiLayers = useSelector(state => state.bufferAnalysis.poiLayers);

  const selectedInfo = useSelector(state => state.analysis.selectedInfo);
  const selectedLayerAttributeFields = useSelector(
    state => state.bufferAnalysis.selectedLayerAttributeFields,
  );
  const selectedRadiusColumn = useSelector(selectedRadiusColumnSelector);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.APPLY_BUFFER_ANALYSIS_REQUEST]),
  );

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(getLayerAttributeFieldsRequest({ layer: selectedLayer.id }));
  }, [dispatch, selectedLayer]);

  const handleApply = () => {
    if (
      !selectedLayer ||
      !outputName ||
      (!bufferRadius && !selectedRadiusColumn)
    ) {
      const errors = [];
      if (!selectedLayer) {
        errors.push('selectedLayer');
      }
      if (!bufferRadius) {
        errors.push('bufferRadius');
      }
      if (!selectedRadiusColumn) {
        errors.push('selectedRadiusColumn');
      }
      if (!outputName) {
        errors.push('outputName');
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

    const payloadData = {
      layer: selectedLayer.id,
      dissolve_output: dissolveOutput,
      radius: radiusUnit === 'kilometer' ? bufferRadius * 1000 : bufferRadius,
      name: outputName,
      project: projectId,
      analysis_id: analysisId,
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
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar -naxatw-mr-[0.7125rem] naxatw-pr-[0.25rem]"
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

          <Container>
            <LayerContent />
          </Container>

          {error.includes('originGeojson') && (
            <FormErrorMessage message="Required Field" />
          )}
        </Container>

        <Container>
          <div>
            <div className="naxatw-space-y-6 naxatw-p-3 naxatw-border naxatw-rounded-md naxatw-border-[#D7D7D7]">
              <div className="naxatw-space-y-2 ">
                <label className="naxatw-label naxatw-flex naxatw-items-center">
                  Buffer Radius
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
                      // reset radius column input on radius input
                      dispatch(handleRadiusColumnSelect(null));
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
                      onChange={item =>
                        dispatch(setDataInputState({ radiusUnit: item.value }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="naxatw-my-[28px] naxatw-flex naxatw-items-center">
                <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
                <p className="naxatw-mx-3 naxatw-text-sm">or</p>
                <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
              </div>

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Radius Column</label>
                <Select
                  placeholder="Select column"
                  options={selectedLayerAttributeFields}
                  labelKey="name"
                  valueKey="id"
                  selected={selectedRadiusColumn?.name}
                  onChange={selectedItem => {
                    dispatch(handleRadiusColumnSelect(selectedItem.id));
                    // reset radius input on radius column select
                    dispatch(
                      setDataInputState({
                        bufferRadius: '',
                      }),
                    );
                  }}
                />
              </div>
            </div>

            {(error.includes('bufferRadius') ||
              error.includes('selectedRadiusColumn')) && (
              <FormErrorMessage message="Required Field" />
            )}

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
