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
              <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                    <h5 className="naxatw-text-grey-800">{theme.name}</h5>
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
                <div>
                  <p>{theme.description}</p>
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
                      <input
                        id={layer.id}
                        type="checkbox"
                        className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                        checked={layer.checked}
                        onChange={e =>
                          handleLayerCheck({
                            checked: e.target.checked,
                            layerId: layer.id,
                            themeId: theme.id,
                          })
                        }
                      />

                      <LegendItem
                        styles={layer.style}
                        className="naxatw-mr-2"
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
                            name="edit"
                            className="material-icons-outlined naxatw-mt-1"
                            style={{ fontSize: '20px' }}
                          />
                        </span>
                      )}
                      <DropdownOptions options={dropdownOptions} data={layer} />
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        );
      });
}
