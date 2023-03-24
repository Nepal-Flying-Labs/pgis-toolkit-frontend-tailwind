/* eslint-disable react/prop-types  */
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
import Spinner from '@Components/common/Spinner/index';
import { isEmpty } from '@Utils/commonUtils';

const {
  setManualFixState,
  handleErrorCheckbox,
  deleteSelectedFeaturesRequest,
  explodeFeatureRequest,
  getFeatureGeojsonRequest,
} = DataCleaningCreators;

const { togglePromptDialog } = CommonCreators;

export default function ErrorSection() {
  const errorFeaturesMapState = useSelector(errorFeaturesMapStateSelector);
  const totalErrors = useSelector(totalErrorsSelector);
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [Types.DELETE_SELECTED_FEATURES_REQUEST]),
  );
  const explodingFeatureIds = useSelector(
    state => state.dataCleaning.manualFix.explodingFeatureIds,
  );
  const dispatch = useDispatch();

  const handleEditClick = (type, feature) => {
    dispatch(
      setManualFixState({
        sidebarContent:
          type === 'null' && !feature.fixed ? 'add-feature' : 'edit-feature',
        selectedError: { ...feature, type },
      }),
    );
  };

  const handleExplodeClick = feature => {
    dispatch(explodeFeatureRequest(feature.id));
  };

  const dropdownOptions = [
    {
      id: 'zoom-to-feature',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">zoom_in</i>
          <p className="naxatw-text-body-lg">Zoom To Feature</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          getFeatureGeojsonRequest({
            mirrorId: data.id,
            parentId: data.parentId,
            type: data.type,
          }),
        );
      },
    },
    {
      id: 'delete-feature',
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-delete_btn">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-delete_btn">
            Delete Feature
          </p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setManualFixState({
            selectedError: { ...data },
          }),
        );
        dispatch(togglePromptDialog('delete-error'));
      },
    },
  ];

  const getDropdownOptions = ({ feature, type }) => {
    const { children, fixed } = feature;
    if (type === 'null') return '';
    if (!children && fixed) return '';
    return (
      <DropdownOptions options={dropdownOptions} data={{ ...feature, type }} />
    );
    if (type !== null) {
      return (
        <DropdownOptions
          options={dropdownOptions}
          data={{ ...feature, type }}
        />
      );
    }
    if (feature?.children && !feature.fixed) {
      return (
        <DropdownOptions
          options={dropdownOptions}
          data={{ ...feature, type }}
        />
      );
    }
  };

  return (
    <>
      {errorFeaturesMapState.map(({ type, label, features }) => (
        <Accordion
          key={type}
          header={
            <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
              <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                  <h5 className="naxatw-text-grey-800">{label}</h5>
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
                  <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-min-h-[40px]">
                    <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                      <input
                        id={`${type}-${feature.id}`}
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
                        htmlFor={`${type}-${feature.id}`}
                      >
                        {feature.id}
                      </label>
                    </div>

                    <div className="naxatw-flex">
                      {!feature?.children && type !== 'multipart' && (
                        <span
                          className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg
                            naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                          onClick={() => handleEditClick(type, feature)}
                        >
                          <IconButton
                            name="edit"
                            className="material-icons-outlined"
                          />
                        </span>
                      )}
                      {type === 'multipart' &&
                        !feature.fixed &&
                        (explodingFeatureIds.includes(feature.id) ? (
                          <Spinner
                            className="naxatw-w-6 naxatw-h-6 naxatw-mr-2 
                              naxatw-fill-secondary-400"
                          />
                        ) : (
                          <IconButton
                            title="Explode"
                            className="material-icons-outlined"
                            name="ssid_chart"
                            onClick={() => {
                              handleExplodeClick(feature);
                            }}
                          />
                        ))}
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

                      {getDropdownOptions({ feature, type })}
                    </div>
                  </div>

                  {feature?.children?.map(childFeature => (
                    <div
                      key={childFeature.id}
                      className="naxatw-pl-3 naxatw-flex naxatw-justify-between naxatw-items-center"
                    >
                      <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                        <input
                          id={childFeature.id}
                          type="checkbox"
                          className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                          checked={childFeature.checked || false}
                          onChange={e =>
                            dispatch(
                              handleErrorCheckbox({
                                id: childFeature.id,
                                name: type,
                                checked: e.target.checked,
                                parentId: childFeature.parentId,
                              }),
                            )
                          }
                        />

                        <label
                          className="naxatw-text-body-lg naxatw-text-grey-800"
                          htmlFor={childFeature.id}
                        >
                          {childFeature.id}
                        </label>
                      </div>

                      <div className="naxatw-flex">
                        <span
                          className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg
                            naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                          onClick={() => handleEditClick(type, childFeature)}
                        >
                          <IconButton
                            name="edit"
                            className="material-icons-outlined"
                          />
                        </span>

                        <DropdownOptions
                          options={dropdownOptions}
                          data={{ ...childFeature, type }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {type === 'null' && !isEmpty(features) && (
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
