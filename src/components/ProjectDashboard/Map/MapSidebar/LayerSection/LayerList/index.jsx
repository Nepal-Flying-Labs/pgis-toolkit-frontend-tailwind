/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import Accordion from '@Components/common/Accordion';
import MaterialIcon from '@Components/common/MaterialIcon';
import { isEmpty } from '@Utils/commonUtils';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import LayerAccordion from '@Components/common/SkeletonLoader/LayerAccordion';
import {
  filteredLayersSelector,
  filteredThemesSelector,
} from '@Selectors/projectMap';
import { checkIfLoading } from '@Utils/loaderSelector';

const { handleCheckbox, saveMapConfigRequest, setProjectMapState } =
  ProjectMapCreators;

export default function LayerList({ dropdownOptions }) {
  const { projectId } = useParams();
  const [hideTitle, setHideTitle] = useState([]);
  const titleLimit = 40;
  const [hoverId, setHoverId] = useState(null);
  const themes = useSelector(filteredThemesSelector);
  const layers = useSelector(filteredLayersSelector);
  const mapSettings = useSelector(state => state.projectMap.mapSettings);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const handleLayerCheck = ({ checked, layerId, themeId }) => {
    dispatch(
      handleCheckbox({
        layerId,
        themeId,
        checked,
      }),
    );
    dispatch(
      saveMapConfigRequest(
        { project: projectId },
        {
          map_config: JSON.stringify({
            ...mapSettings,
            checkedLayers: checked
              ? [...new Set([...mapSettings.checkedLayers, layerId])]
              : mapSettings.checkedLayers.filter(id => id !== layerId),
          }),
        },
      ),
    );
  };

  return isLoading || themes === null
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
                    {/*
                    <span className="naxatw-p-1 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer">
                      <MaterialIcon
                        name="edit"
                        className="material-icons-outlined naxatw-mt-1"
                      />
                    </span>
                */}
                  </div>
                </div>
                <div className={`${!theme.description ? '' : 'naxatw-mb-3'}`}>
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
                    onMouseEnter={() => setHoverId(layer.id)}
                    onMouseLeave={() => setHoverId(null)}
                  >
                    <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                      <div className="naxatw-w-6 naxatw-h-6 naxatw-p-[3px] naxatw-mr-3 naxatw-flex naxatw-items-center naxatw-justify-center">
                        <input
                          id={layer.id}
                          type="checkbox"
                          className="naxatw-w-4 naxatw-h-4 naxatw-accent-grey-800"
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
                      {layer.id === hoverId && (
                        <span
                          className="naxatw-p-1.5 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                          onClick={() => {
                            dispatch(
                              setProjectMapState({
                                selectedLayer: layer,
                                sidebarContent: 'edit-style',
                              }),
                            );
                          }}
                        >
                          <MaterialIcon
                            name="brush"
                            className="material-icons-outlined naxatw-mt-1"
                            style={{ fontSize: '20px' }}
                          />
                        </span>
                      )}
                      <DropdownOptions
                        direction="left-bottom"
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
      });
}
