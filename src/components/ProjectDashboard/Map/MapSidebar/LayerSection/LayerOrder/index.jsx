/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { arrayMove } from '@dnd-kit/sortable';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import { SortableList, SortableItem } from '@Components/common/DNDKit';
import { mapStateSelector } from '@Selectors/projectMap';

const {
  handleCheckbox,
  setZoomToLayerId,
  setSelectedLayer,
  setDeleteLayer,
  saveMapConfigRequest,
  setProjectMapState,
} = ProjectMapCreators;
const { togglePromptDialog } = CommonCreators;

export default function LayerOrder() {
  const { projectId } = useParams();
  const [hoverId, setHoverId] = useState(null);
  const mapState = useSelector(mapStateSelector);
  const mapSettings = useSelector(state => state.projectMap.mapSettings);
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

  const dropdownOptions = [
    {
      id: 1,
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
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: data => {
        dispatch(setDeleteLayer(data));
        dispatch(togglePromptDialog('delete-layer'));
      },
    },
  ];

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
                  className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-my-2"
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
                        className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer"
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
                    <DropdownOptions options={dropdownOptions} data={layer} />
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
