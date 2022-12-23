/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { arrayMove } from '@dnd-kit/sortable';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import { SortableList, SortableItem } from '@Components/common/DNDKit';
import { mapStateSelector } from '@Selectors/projectMap';

const {
  handleCheckbox,
  setSelectedLayer,
  saveMapConfigRequest,
  setProjectMapState,
} = ProjectMapCreators;

export default function LayerOrder({ dropdownOptions }) {
  const { projectId } = useParams();
  const [hoverId, setHoverId] = useState(null);
  const mapState = useSelector(mapStateSelector);
  const mapSettings = useSelector(state => state.projectMap.mapSettings);
  const projectAreaLayerId = useSelector(
    state => state.projectMap.projectAreaLayerId,
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

  const handleLayerSort = event => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const { layerOrder } = mapSettings;
    const oldIndex = layerOrder.findIndex(id => id === active.id);
    const newIndex = layerOrder.findIndex(id => id === over.id);
    const sortedLayerOrder = arrayMove(layerOrder, oldIndex, newIndex);
    dispatch(
      setProjectMapState({
        mapSettings: { ...mapSettings, layerOrder: sortedLayerOrder },
      }),
    );
    dispatch(
      saveMapConfigRequest(
        { project: projectId },
        {
          map_config: JSON.stringify({
            ...mapSettings,
            layerOrder: sortedLayerOrder,
          }),
        },
      ),
    );
  };

  return (
    <div className="naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-lg naxatw-p-5">
      <SortableList items={mapState} onDragEnd={handleLayerSort}>
        <div className="naxatw-font-light">
          {mapState.map(layer => (
            <SortableItem
              key={`item-${layer.id}`}
              id={layer.id}
              content={({ listeners, attributes }) => (
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
                      className="naxatw-w-4 naxatw-h-4 naxatw-mr-2 naxatw-accent-grey-800"
                      checked={layer.checked}
                      onChange={e =>
                        handleLayerCheck({
                          checked: e.target.checked,
                          layerId: layer.id,
                          themeId: layer.theme,
                        })
                      }
                    />

                    <a
                      className="naxatw-flex naxatw-cursor-move naxatw-mr-2"
                      {...listeners}
                      {...attributes}
                    >
                      <MaterialIcon name="unfold_more" />
                    </a>

                    <LegendItem styles={layer.style} className="naxatw-mr-2" />

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
                          dispatch(setSelectedLayer(layer));
                        }}
                      >
                        <MaterialIcon
                          name="edit"
                          className="material-icons-outlined naxatw-mt-1"
                          style={{ fontSize: '20px' }}
                        />
                      </span>
                    )}
                    <DropdownOptions
                      options={
                        layer.id === projectAreaLayerId
                          ? dropdownOptions.filter(item => item.id !== 3)
                          : dropdownOptions
                      }
                      data={layer}
                    />
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      </SortableList>
    </div>
  );
}
