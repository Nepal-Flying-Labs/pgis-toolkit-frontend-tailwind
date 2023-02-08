import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  errorFeaturesMapStateSelector,
  totalErrorsSelector,
} from '@Selectors/dataCleaning';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as DataCleaningCreators, Types } from '@Actions/dataCleaning';
import Accordion from '@Components/common/Accordion';
import IconButton from '@Components/common/IconButton';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';
import DropdownOptions from '@Components/common/DropdownOptions';

const {
  setManualFixState,
  handleErrorCheckbox,
  deleteSelectedFeaturesRequest,
  explodeFeatureRequest,
} = DataCleaningCreators;

const { togglePromptDialog } = CommonCreators;

export default function ErrorSection() {
  const errorFeaturesMapState = useSelector(errorFeaturesMapStateSelector);
  const totalErrors = useSelector(totalErrorsSelector);
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [Types.DELETE_SELECTED_FEATURES_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleEditClick = (type, feature) => {
    if (type === 'null') {
      dispatch(
        setManualFixState({
          drawFeatureId: feature.id,
          sidebarContent: feature.fixed ? 'edit-feature' : 'add-feature',
          selectedErrorType: type,
          selectedError: { ...feature, type },
        }),
      );
    }
    if (type === 'multipart') {
      dispatch(
        setManualFixState({
          sidebarContent: 'edit-feature',
          selectedFeatureGeojson: feature.geojson,
          selectedErrorType: type,
          selectedError: { ...feature, type },
        }),
      );
    }
  };

  const handleExplodeClick = feature => {
    dispatch(explodeFeatureRequest(feature.id));
  };

  const dropdownOptions = [
    {
      id: 'zoom-to-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">zoom_in</i>
          <p className="naxatw-text-body-lg">Zoom To Layer</p>
        </span>
      ),
      onClick: data => {
        // dispatch(
        // setResultsState({ zoomToBuffer: { id: data.id, bbox: data.bbox } }),
        // );
      },
    },
  ];

  return (
    <>
      {errorFeaturesMapState.map(({ type, features }) => (
        <Accordion
          key={type}
          header={
            <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
              <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                  <h5 className="naxatw-text-grey-800">{type}</h5>
                </div>
              </div>
              <div>
                <p>
                  {features.length} out of {totalErrors} errors
                </p>
              </div>
            </div>
          }
          body={
            <div>
              {features.map(feature => (
                <div key={feature.id}>
                  <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                    <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                      <input
                        id={feature.id}
                        type="checkbox"
                        className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                        checked={feature.checked}
                        onChange={e =>
                          dispatch(
                            handleErrorCheckbox({
                              id: feature.id,
                              name: type,
                              checked: e.target.checked,
                            }),
                          )
                        }
                      />

                      {feature.fixed && (
                        <span
                          className="naxatw-flex naxatw-items-center naxatw-mr-2"
                          style={{ color: '#40B449' }}
                        >
                          <i
                            className="material-icons-outlined"
                            style={{ fontSize: '22px' }}
                          >
                            check
                          </i>
                        </span>
                      )}
                      <label
                        className="naxatw-text-body-lg naxatw-text-grey-800"
                        htmlFor={feature.id}
                      >
                        {feature.id}
                      </label>
                    </div>

                    <div className="naxatw-flex">
                      {type !== 'multipart' && (
                        <span
                          className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                          onClick={() => handleEditClick(type, feature)}
                        >
                          <IconButton
                            name="edit"
                            className="material-icons-outlined"
                          />
                        </span>
                      )}
                      {type === 'multipart' && !feature.fixed && (
                        <IconButton
                          title="Explode"
                          className="material-icons-outlined"
                          name="ssid_chart"
                          onClick={() => {
                            handleExplodeClick(feature);
                          }}
                        />
                      )}
                      {type === 'null' && (
                        <IconButton
                          className="material-icons-outlined naxatw-text-delete_btn"
                          name="delete"
                          onClick={() => {
                            dispatch(
                              setManualFixState({
                                selectedError: { ...feature, type },
                              }),
                            );
                            dispatch(togglePromptDialog('delete-error'));
                          }}
                        />
                      )}

                      <DropdownOptions
                        options={dropdownOptions}
                        data={feature}
                      />
                    </div>
                  </div>

                  {type === 'multipart' &&
                    feature?.explodedFeatures?.map(explodedFeat => (
                      <div
                        key={explodedFeat.id}
                        className="naxatw-pl-3 naxatw-flex naxatw-justify-between naxatw-items-center"
                      >
                        <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                          <input
                            id={explodedFeat.id}
                            type="checkbox"
                            className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                            checked={explodedFeat.checked}
                            onChange={e =>
                              dispatch(
                                handleErrorCheckbox({
                                  id: explodedFeat.id,
                                  name: type,
                                  checked: e.target.checked,
                                }),
                              )
                            }
                          />

                          <label
                            className="naxatw-text-body-lg naxatw-text-grey-800"
                            htmlFor={explodedFeat.id}
                          >
                            {explodedFeat.id}
                          </label>
                        </div>

                        <div className="naxatw-flex">
                          <span
                            className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                            onClick={() => handleEditClick(type, explodedFeat)}
                          >
                            <IconButton
                              name="edit"
                              className="material-icons-outlined"
                            />
                          </span>
                          {type === 'null' && (
                            <IconButton
                              className="material-icons-outlined naxatw-text-delete_btn"
                              name="delete"
                              onClick={() => {
                                dispatch(
                                  setManualFixState({
                                    selectedError: { ...explodedFeat, type },
                                  }),
                                );
                                dispatch(togglePromptDialog('delete-error'));
                              }}
                            />
                          )}

                          <DropdownOptions
                            options={dropdownOptions}
                            data={explodedFeat}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
              {type === 'null' && (
                <div className="naxatw-flex naxatw-justify-center">
                  <Button
                    className="naxatw-text-delete_btn"
                    isLoading={isDeleting}
                    iconLeft="delete"
                    iconClassName="material-icons-outlined"
                    onClick={() => {
                      dispatch(deleteSelectedFeaturesRequest());
                    }}
                  >
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          }
        />
      ))}
    </>
  );
}
