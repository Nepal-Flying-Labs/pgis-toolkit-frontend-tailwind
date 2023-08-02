/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as DataCleaningCreators, Types } from '@Actions/dataCleaning';
import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import Accordion from '@Components/common/Accordion';
import Spinner from '@Components/common/Spinner';
import { isErrorLeftSelector } from '@Selectors/dataCleaning';
import { checkIfLoading } from '@Utils/loaderSelector';

const {
  checkErrorRequest,
  handleAutofixCheckbox,
  autoFixErrorRequest,
  setDataCleaningState,
  checkLayerLogsRequest,
} = DataCleaningCreators;

const { togglePromptDialog, toggleModal } = CommonCreators;

function getStatusIcon(status) {
  switch (status) {
    case 'checking':
      return { color: '#FF5A5F', icon: 'rotate_right' };
    case 'fixing':
      return { color: '#FF5A5F', icon: 'rotate_right' };
    case 'error':
      return { color: '#FFB100', icon: 'error_outline' };
    case 'fix-failed':
      return { color: '#FFB100', icon: 'error_outline' };
    case 'success':
      return { color: '#40B449', icon: 'check_circle' };
    default:
      return { color: '#40B449', icon: 'check_circle' };
  }
}

export default function StepTwo() {
  const selectedRoadLayer = useSelector(
    state => state.dataCleaning.optimalRoute.selectedRoadLayer,
  );
  const selectedObstacleLayers = useSelector(
    state => state.dataCleaning.optimalRoute.selectedObstacleLayers,
  );
  const errorStates = useSelector(state => state.dataCleaning.errorStates);
  const isErrorLeft = useSelector(isErrorLeftSelector);
  const toggledAccordionIds = useSelector(
    state => state.dataCleaning.toggledAccordionIds,
  );
  const checkLogsLoading = useSelector(state =>
    checkIfLoading(state, [Types.CHECK_LAYER_LOGS_REQUEST]),
  );
  const dispatch = useDispatch();

  const data = useMemo(
    () => [selectedRoadLayer, ...selectedObstacleLayers],
    [selectedRoadLayer, selectedObstacleLayers],
  );

  useEffect(() => {
    data.forEach(item => {
      dispatch(checkLayerLogsRequest({ layer: item.id }));
    });
  }, [dispatch, data]);

  const isAllChecked = Object.keys(errorStates).length === data.length;

  // loader while checking logs
  if (checkLogsLoading) {
    return (
      <div className="naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
        <Spinner className="!naxatw-h-10 !naxatw-w-10 naxatw-fill-grey-500" />
      </div>
    );
  }

  return (
    <div>
      {/* <h4>Data</h4> */}
      <p className="naxatw-mt-2 naxatw-text-body-lg">
        To continue with the data cleaning phase, please click on &quot;Check
        Error&quot; button to verify each layer before performing analysis.
      </p>

      <div className="naxatw-mt-5 naxatw-space-y-5">
        {data.map(layer => {
          const errorState = errorStates[layer.id];
          const isLayerCheckingError =
            errorState && errorState.some(item => item.status === 'checking');
          const hasError = errorState?.some(item => item.errorData);
          const isAccordionToggled = toggledAccordionIds.includes(layer.id);
          const isErrorsChecked = !!errorState?.some(item => item.checked);
          return (
            <Accordion
              key={layer.id}
              collapsed={!isAccordionToggled}
              onToggle={toggleState => {
                dispatch(
                  setDataCleaningState({
                    toggledAccordionIds: toggleState
                      ? [...toggledAccordionIds, layer.id]
                      : toggledAccordionIds.filter(
                          accordionId => accordionId !== layer.id,
                        ),
                  }),
                );
              }}
              className={`!naxatw-p-2 ${
                isAccordionToggled ? 'naxatw-bg-grey-50' : ''
              }`}
              header={
                <div className="naxatw-pl-2 naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                  <div
                    className="naxatw-flex naxatw-items-center naxatw-justify-between
                  naxatw-w-full"
                  >
                    <h5 className="naxatw-text-grey-800 naxatw-font-semibold">
                      {layer.name}
                    </h5>
                    <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                      {/*
                        <span
                          className="naxatw-p-1 hover:naxatw-bg-grey-100
                        hover:naxatw-rounded-lg naxatw-cursor-pointer"
                        >
                          <IconButton
                            name="edit"
                            className="material-icons-outlined naxatw-mt-1"
                          />
                        </span>
                      */}
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                        disabled={
                          isLayerCheckingError || layer.id in errorStates
                        }
                        onClick={() => {
                          if (!errorState)
                            dispatch(
                              checkErrorRequest({
                                layerId: layer.id,
                                geometryType: layer.geom_type,
                              }),
                            );
                          dispatch(
                            setDataCleaningState({
                              toggledAccordionIds: [
                                ...toggledAccordionIds,
                                layer.id,
                              ],
                            }),
                          );
                        }}
                      >
                        Check Error
                      </Button>
                    </div>
                  </div>
                </div>
              }
              body={
                <div>
                  <div className="naxatw-p-2 naxatw-space-y-4">
                    {errorState?.map(
                      ({ label, status, errorData, totalData, id }) => (
                        <div
                          key={id}
                          className="naxatw-grid naxatw-grid-cols-2 naxatw-items-center"
                        >
                          <div
                            className={`naxatw-flex naxatw-items-center naxatw-gap-2
                        ${
                          (id === 'isolated' && status === 'error') ||
                          (!isLayerCheckingError && status !== 'error')
                            ? 'naxatw-pl-6'
                            : ''
                        }
                        `}
                          >
                            {id !== 'isolated' &&
                              !isLayerCheckingError &&
                              status === 'error' && (
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="naxatw-min-w-[1rem] naxatw-min-h-[1rem]
                                  naxatw-accent-grey-800 naxatw-cursor-pointer"
                                  checked={errorState.checked}
                                  onChange={e => {
                                    const { checked } = e.target;
                                    dispatch(
                                      handleAutofixCheckbox({
                                        layerId: layer.id,
                                        id,
                                        checked,
                                      }),
                                    );
                                  }}
                                />
                              )}

                            {status !== 'waiting' && (
                              <span
                                className="naxatw-flex naxatw-items-center naxatw-select-none"
                                style={{ color: getStatusIcon(status).color }}
                              >
                                <i className="material-icons-outlined">
                                  {getStatusIcon(status).icon}
                                </i>
                              </span>
                            )}
                            <p
                              className={`${
                                status === 'waiting' ? 'naxatw-pl-8' : ''
                              }`}
                            >
                              {label}
                            </p>
                          </div>
                          <span>
                            {status === 'success' ? (
                              <p className="naxatw-text-body-lg naxatw-text-grey-800">
                                <b>0</b> error out of <b>{totalData}</b> data
                              </p>
                            ) : status === 'error' ? (
                              <p className="naxatw-text-body-lg naxatw-text-grey-800">
                                <b>{errorData}</b>{' '}
                                {errorData > 1 ? 'errors' : 'error'} out of{' '}
                                <b>{totalData}</b> data
                              </p>
                            ) : status === 'fix-failed' ? (
                              <p className="naxatw-text-body-lg naxatw-text-grey-800">
                                <b>{errorData}</b> fixed out of{' '}
                                <b>{totalData}</b> errors
                              </p>
                            ) : status === 'checking' ? (
                              <p className="naxatw-text-body-btn naxatw-text-primary-400">
                                Checking...
                              </p>
                            ) : status === 'fixing' ? (
                              <p className="naxatw-text-body-btn naxatw-text-primary-400">
                                Fixing...
                              </p>
                            ) : (
                              <p className="naxatw-text-body-btn naxatw-text-grey-500">
                                Waiting
                              </p>
                            )}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                  {errorState && !isLayerCheckingError && hasError && (
                    <div className="naxatw-mt-4 naxatw-flex naxatw-justify-end naxatw-gap-2">
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder !naxatw-px-2"
                        disabled={isLayerCheckingError || !isErrorsChecked}
                        onClick={() =>
                          dispatch(
                            autoFixErrorRequest({
                              layer: layer.id,
                            }),
                          )
                        }
                      >
                        Automatic Fix
                      </Button>
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder !naxatw-px-2"
                        disabled={isLayerCheckingError}
                        onClick={() => {
                          dispatch(
                            setDataCleaningState({
                              selectedLayer: layer,
                            }),
                          );
                        }}
                      >
                        Manual Fix
                      </Button>
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
      </div>

      <div className="naxatw-flex naxatw-justify-end naxatw-my-10">
        <Button
          className={`naxatw-btn-primary ${
            !isAllChecked ? 'naxatw-btn-disabled' : ''
          }`}
          onClick={() => {
            if (!isAllChecked) return;
            if (isErrorLeft) {
              dispatch(togglePromptDialog('start-analysis-prompt'));
            } else {
              dispatch(toggleModal('create-analysis'));
            }
          }}
          disabled={!isAllChecked}
        >
          Start Analysis
        </Button>
      </div>
    </div>
  );
}
