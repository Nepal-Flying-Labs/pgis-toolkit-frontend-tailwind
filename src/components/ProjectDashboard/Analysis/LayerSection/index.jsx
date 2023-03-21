/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as AnalysisCreators, Types } from '@Actions/analysis';
import Accordion from '@Components/common/Accordion';
import { isEmpty } from '@Utils/commonUtils';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import LayerAccordion from '@Components/common/SkeletonLoader/LayerAccordion';
import {
  filteredLayersSelector,
  filteredThemesSelector,
} from '@Selectors/analysis';
import DropdownOptions from '@Components/common/DropdownOptions';
import { checkIfLoading } from '@Utils/loaderSelector';
import { analysisHeaderHeight } from '@src/constants';
import { useParams } from 'react-router';

const { handleLayerCheckbox, setZoomToLayerId } = AnalysisCreators;

export default function LayerSection() {
  const { tabname } = useParams();
  const [hideTitle, setHideTitle] = useState([]);
  const titleLimit = 40;
  const themes = useSelector(filteredThemesSelector);
  const layers = useSelector(filteredLayersSelector);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const handleLayerCheck = ({ checked, layerId, themeId }) => {
    dispatch(
      handleLayerCheckbox({
        layerId,
        themeId,
        checked,
      }),
    );
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
        dispatch(setZoomToLayerId(data.id));
      },
    },
  ];

  return (
    <div
      className="naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto scrollbar"
      style={{
        height: `calc(100vh - ${analysisHeaderHeight} - ${
          tabname === 'data-cleaning' ? '7.5rem' : '3.5rem'
        })`,
      }}
    >
      {isLoading || themes === null
        ? [...Array(3)].map((_, idx) => <LayerAccordion key={idx} />)
        : themes.map(theme => {
            const hasNoLayer = isEmpty(layers?.[theme.id]);
            return (
              <Accordion
                key={theme.id}
                collapsed={hasNoLayer}
                header={
                  <div className="naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-w-full">
                    <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                      <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                        <h5 className="naxatw-text-grey-800 naxatw-font-semibold">
                          {theme.name}
                        </h5>
                      </div>
                    </div>
                    <div
                      className={`${!theme.description ? '' : 'naxatw-mb-3'}`}
                    >
                      <p
                        className={`${
                          !hideTitle?.includes(theme.id)
                            ? 'naxatw-h-fit'
                            : 'naxatw-h-[2.78rem] naxatw-text-ellipsis naxatw-overflow-hidden'
                        } naxatw-text-body-md`}
                      >
                        {hideTitle?.includes(theme.id) &&
                        theme.description?.length > 0
                          ? theme?.description
                          : theme?.description?.slice(0, titleLimit + 10)}
                        {theme?.description?.length > 0 ? (
                          hideTitle?.includes(theme.id) ? (
                            <button
                              type="button"
                              className="naxatw-text-secondary-400 hover:naxatw-underline"
                              onClick={e => {
                                e.stopPropagation();
                                setHideTitle(prev =>
                                  prev.filter(item => item !== theme.id),
                                );
                              }}
                            >
                              See less
                            </button>
                          ) : (
                            <span className="naxatw-inline-flex">
                              <span className="naxatw-px-1">...</span>
                              <button
                                type="button"
                                className="naxatw-text-secondary-400 hover:naxatw-underline"
                                onClick={e => {
                                  e.stopPropagation();
                                  setHideTitle([...hideTitle, theme.id]);
                                }}
                              >
                                See more
                              </button>
                            </span>
                          )
                        ) : (
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                }
                body={
                  <div>
                    {layers?.[theme.id]?.map(layer => (
                      <div
                        key={layer.id}
                        className="naxatw-flex naxatw-justify-between naxatw-items-center"
                      >
                        <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                          <div className="naxatw-w-6 naxatw-h-6 naxatw-p-[3px] naxatw-mr-3 naxatw-flex naxatw-items-center naxatw-justify-center">
                            <input
                              id={layer.id}
                              type="checkbox"
                              className="naxatw-w-full naxatw-h-full  naxatw-accent-grey-800"
                              checked={layer.checked}
                              onChange={e =>
                                handleLayerCheck({
                                  checked: e.target.checked,
                                  layerId: layer.id,
                                  themeId: theme.id,
                                })
                              }
                            />
                          </div>

                          <LegendItem
                            styles={layer.style}
                            className="naxatw-mr-2"
                            size="21px"
                          />

                          <label
                            className="naxatw-text-body-lg naxatw-text-grey-800"
                            htmlFor={layer.id}
                          >
                            {layer.name}
                          </label>
                        </div>

                        <div className="naxatw-flex">
                          <DropdownOptions
                            options={
                              layer.layer_type === 'WMS'
                                ? dropdownOptions.filter(
                                    item => item.id === 'delete-layer',
                                  )
                                : dropdownOptions
                            }
                            data={layer}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            );
          })}
    </div>
  );
}
