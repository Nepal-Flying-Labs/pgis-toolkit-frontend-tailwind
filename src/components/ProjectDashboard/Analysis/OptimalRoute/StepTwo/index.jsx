/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import Button from '@Components/common/Button';
import Accordion from '@Components/common/Accordion';
import MaterialIcon from '@Components/common/MaterialIcon';

const { checkErrorRequest } = AnalysisCreators;

export default function StepTwo() {
  const selectedRoadLayer = useSelector(
    state => state.analysis.optimalRoute.selectedRoadLayer,
  );
  const selectedObstacleLayers = useSelector(
    state => state.analysis.optimalRoute.selectedObstacleLayers,
  );
  const errorStates = useSelector(state => state.analysis.errorStates);
  const dispatch = useDispatch();

  return (
    <div>
      <h4>Data</h4>

      <div className="naxatw-mt-5 naxatw-space-y-5">
        <Accordion
          collapsed={false}
          className=""
          header={
            <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
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
                    <MaterialIcon
                      name="edit"
                      className="material-icons-outlined naxatw-mt-1"
                    />
                  </span>
                  <Button
                    className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                    onClick={() => {
                      if (!errorStates[selectedRoadLayer.id])
                        dispatch(
                          checkErrorRequest({
                            layer: selectedRoadLayer.id,
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
              {errorStates[selectedRoadLayer.id]?.map(
                ({ label, status, errorData, totalData }) => (
                  <div
                    key={label}
                    className="naxatw-flex naxatw-items-center naxatw-justify-between"
                  >
                    <p>{label}</p>
                    <p>
                      {status === 'error'
                        ? `${errorData} out of ${totalData} errors`
                        : status === 'checking'
                        ? 'Checking..'
                        : 'Waiting..'}
                    </p>
                  </div>
                ),
              )}
            </div>
          }
        />

        {selectedObstacleLayers.map(layer => (
          <Accordion
            key={layer.id}
            collapsed={false}
            className=""
            header={
              <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                  <h5 className="naxatw-text-grey-800">{layer.name}</h5>
                  <div className="naxatw-flex naxatw-gap-2">
                    <span className="naxatw-p-1 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer">
                      <MaterialIcon
                        name="edit"
                        className="material-icons-outlined naxatw-mt-1"
                      />
                    </span>
                    <Button
                      className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                      onClick={() => {
                        if (!errorStates[layer.id])
                          dispatch(
                            checkErrorRequest({
                              layer: layer.id,
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
                {errorStates[layer.id]?.map(
                  ({ label, status, errorData, totalData }) => (
                    <div
                      key={label}
                      className="naxatw-flex naxatw-items-center naxatw-justify-between"
                    >
                      <p>{label}</p>
                      <p>
                        {status === 'error'
                          ? `${errorData} out of ${totalData} errors`
                          : status === 'checking'
                          ? 'Checking..'
                          : 'Waiting..'}
                      </p>
                    </div>
                  ),
                )}
              </div>
            }
          />
        ))}
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-mt-10">
        <Button className="naxatw-btn-primary" onClick={() => {}}>
          Next
        </Button>
      </div>
    </div>
  );
}
