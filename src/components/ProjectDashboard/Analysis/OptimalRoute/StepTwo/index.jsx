/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as DataCleaningCreators } from '@Actions/dataCleaning';
import Button from '@Components/common/Button';
import Accordion from '@Components/common/Accordion';
import IconButton from '@Components/common/IconButton';

const { checkErrorRequest, handleAutofixCheckbox, autoFixErrorRequest } =
  DataCleaningCreators;

function getStatusIcon(status) {
  switch (status) {
    case 'checking':
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
  const [toggledStates, setToggledStates] = useState({});
  const errorStates = useSelector(state => state.dataCleaning.errorStates);
  const dispatch = useDispatch();

  const isRoadLayerCheckingError =
    errorStates[selectedRoadLayer.id] &&
    errorStates[selectedRoadLayer.id].some(item => item.status === 'checking');

  return (
    <div>
      <h4>Data</h4>

      <div className="naxatw-mt-5 naxatw-space-y-5">
        <Accordion
          collapsed={!toggledStates[selectedRoadLayer.id]}
          onToggle={toggleState => {
            setToggledStates(prev => ({
              ...prev,
              [selectedRoadLayer.id]: toggleState,
            }));
          }}
          className={`!naxatw-p-2 ${
            toggledStates[selectedRoadLayer.id] ? 'naxatw-bg-grey-50' : ''
          }`}
          header={
            <div className="naxatw-pl-2 naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
              <div
                className="naxatw-flex naxatw-items-center naxatw-justify-between
                  naxatw-w-full"
              >
                <h5 className="naxatw-text-grey-800">
                  {selectedRoadLayer.name}
                </h5>
                <div className="naxatw-flex naxatw-gap-2">
                  <span
                    className="naxatw-p-1 hover:naxatw-bg-grey-100
                      hover:naxatw-rounded-lg naxatw-cursor-pointer"
                  >
                    <IconButton
                      name="edit"
                      className="material-icons-outlined naxatw-mt-1"
                    />
                  </span>
                  <Button
                    className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                    disabled={isRoadLayerCheckingError}
                    onClick={() => {
                      if (!errorStates[selectedRoadLayer.id])
                        dispatch(
                          checkErrorRequest({
                            layer: selectedRoadLayer.id,
                          }),
                        );
                      setToggledStates(prev => ({
                        ...prev,
                        [selectedRoadLayer.id]: true,
                      }));
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
                {errorStates[selectedRoadLayer.id]?.map(
                  ({ label, status, errorData, totalData, id }) => (
                    <div
                      key={id}
                      className="naxatw-grid naxatw-grid-cols-2 naxatw-items-center"
                    >
                      <div
                        className={`naxatw-flex naxatw-items-center naxatw-gap-2
                        ${
                          !isRoadLayerCheckingError && status !== 'error'
                            ? 'naxatw-pl-6'
                            : ''
                        }
                        `}
                      >
                        {!isRoadLayerCheckingError && status === 'error' && (
                          <input
                            id={id}
                            type="checkbox"
                            className="naxatw-min-w-[1rem] naxatw-min-h-[1rem]
                              naxatw-accent-grey-800 naxatw-cursor-pointer"
                            checked={errorStates[selectedRoadLayer.id].checked}
                            onChange={e => {
                              const { checked } = e.target;
                              dispatch(
                                handleAutofixCheckbox({
                                  layerId: selectedRoadLayer.id,
                                  id,
                                  checked,
                                }),
                              );
                            }}
                          />
                        )}

                        {status !== 'waiting' && (
                          <span
                            className="naxatw-flex naxatw-items-center"
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
                        {status === 'error' || status === 'success' ? (
                          <p className="naxatw-text-body-lg naxatw-text-grey-800">
                            <b>{errorData}</b> out of <b>{totalData}</b> errors
                          </p>
                        ) : status === 'fix-failed' ? (
                          <p className="naxatw-text-body-lg naxatw-text-grey-800">
                            <b>{errorData}</b> out of <b>{totalData}</b> fixed
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
              {!isRoadLayerCheckingError && (
                <div className="naxatw-mt-4 naxatw-flex naxatw-justify-end naxatw-gap-2">
                  <Button
                    className="naxatw-btn-secondary naxatw-btn-noborder !naxatw-px-2"
                    disabled={isRoadLayerCheckingError}
                    onClick={() =>
                      dispatch(
                        autoFixErrorRequest({ layer: selectedRoadLayer.id }),
                      )
                    }
                  >
                    Automatic Fix
                  </Button>
                  <Button
                    className="naxatw-btn-secondary naxatw-btn-noborder !naxatw-px-2"
                    disabled={isRoadLayerCheckingError}
                  >
                    Manual Fix
                  </Button>
                </div>
              )}
            </div>
          }
        />

        {selectedObstacleLayers.map(layer => {
          const isLayerCheckingError =
            errorStates[layer.id] &&
            errorStates[layer.id].some(item => item.status === 'waiting');
          return (
            <Accordion
              key={layer.id}
              collapsed={!toggledStates[layer.id]}
              onToggle={toggleState => {
                setToggledStates(prev => ({
                  ...prev,
                  [layer.id]: toggleState,
                }));
              }}
              className={`!naxatw-p-2 ${
                toggledStates[layer.id] ? 'naxatw-bg-grey-50' : ''
              }`}
              header={
                <div className="naxatw-pl-2 naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                  <div
                    className="naxatw-flex naxatw-items-center naxatw-justify-between
                  naxatw-w-full"
                  >
                    <h5 className="naxatw-text-grey-800">{layer.name}</h5>
                    <div className="naxatw-flex naxatw-gap-2">
                      <span
                        className="naxatw-p-1 hover:naxatw-bg-grey-100
                      hover:naxatw-rounded-lg naxatw-cursor-pointer"
                      >
                        <IconButton
                          name="edit"
                          className="material-icons-outlined naxatw-mt-1"
                        />
                      </span>
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                        disabled={isLayerCheckingError}
                        onClick={() => {
                          if (!errorStates[layer.id])
                            dispatch(
                              checkErrorRequest({
                                layer: layer.id,
                              }),
                            );
                          setToggledStates(prev => ({
                            ...prev,
                            [layer.id]: true,
                          }));
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
                    {errorStates[layer.id]?.map(
                      ({ label, status, errorData, totalData, id }) => (
                        <div
                          key={id}
                          className="naxatw-grid naxatw-grid-cols-2 naxatw-items-center"
                        >
                          <div
                            className={`naxatw-flex naxatw-items-center naxatw-gap-2
                        ${
                          !isLayerCheckingError && status !== 'error'
                            ? 'naxatw-pl-6'
                            : ''
                        }
                        `}
                          >
                            {!isLayerCheckingError && status === 'error' && (
                              <input
                                id={id}
                                type="checkbox"
                                className="naxatw-min-w-[1rem] naxatw-min-h-[1rem]
                              naxatw-accent-grey-800 naxatw-cursor-pointer"
                                checked={errorStates[layer.id].checked}
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
                                className="naxatw-flex naxatw-items-center"
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
                            {status === 'error' || status === 'success' ? (
                              <p className="naxatw-text-body-lg naxatw-text-grey-800">
                                <b>{errorData}</b> out of <b>{totalData}</b>{' '}
                                errors
                              </p>
                            ) : status === 'fix-failed' ? (
                              <p className="naxatw-text-body-lg naxatw-text-grey-800">
                                <b>{errorData}</b> out of <b>{totalData}</b>{' '}
                                fixed
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
                  {!isLayerCheckingError && (
                    <div className="naxatw-mt-4 naxatw-flex naxatw-justify-end naxatw-gap-2">
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder !naxatw-px-2"
                        disabled={isLayerCheckingError}
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

      <div className="naxatw-flex naxatw-justify-center naxatw-mt-10">
        <Button className="naxatw-btn-primary" onClick={() => {}}>
          Next
        </Button>
      </div>
    </div>
  );
}
