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

const {
  setManualFixState,
  handleErrorCheckbox,
  deleteSelectedFeaturesRequest,
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
          drawFeatureId: feature,
          sidebarContent: 'add-feature',
        }),
      );
    }
  };

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
                <div
                  key={feature.id}
                  className="naxatw-flex naxatw-justify-between naxatw-items-center"
                >
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

                    <label
                      className="naxatw-text-body-lg naxatw-text-grey-800"
                      htmlFor={feature.id}
                    >
                      {feature.id}
                    </label>
                  </div>

                  <div className="naxatw-flex">
                    <span
                      className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                      onClick={() => handleEditClick(type, feature.id)}
                    >
                      <IconButton
                        name="edit"
                        className="material-icons-outlined"
                        onClick={() => {
                          dispatch(
                            setManualFixState({
                              drawFeatureId: feature.id,
                              sidebarContent: 'add-feature',
                              selectedError: { ...feature, type },
                            }),
                          );
                        }}
                      />
                    </span>
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
                  </div>
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
