/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import MaterialIcon from '@Components/common/MaterialIcon';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import { checkIfLoading } from '@Utils/loaderSelector';

const {
  handleCheckbox,
  setZoomToLayerId,
  setSelectedProjectTheme,
  setSelectedLayer,
  setDeleteLayer,
} = ProjectMapCreators;
const { toggleModal, togglePromptDialog } = CommonCreators;

export default function LayerOrder() {
  const themes = useSelector(state => state.projectMap.themes);
  const layers = useSelector(state => state.projectMap.layers);
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
    if (checked) {
      dispatch(setZoomToLayerId(layerId));
    }
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

  return (
    <div className="naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-lg naxatw-p-5">
      <div>
        <div className="naxatw-font-light">
          {layers[22].map(layer => (
            <div
              key={layer.id}
              className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-my-2"
            >
              <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                <input
                  id={layer.id}
                  type="checkbox"
                  className="naxatw-w-4 naxatw-h-4 naxatw-mr-4 naxatw-accent-grey-800"
                  checked={layer.checked}
                  onChange={e =>
                    handleLayerCheck({
                      checked: e.target.checked,
                      layerId: layer.id,
                      // themeId: theme.id,
                    })
                  }
                />

                <LegendItem styles={layer.style} className="naxatw-mr-2" />

                <label
                  className="naxatw-text-body-lg naxatw-text-grey-800"
                  htmlFor={layer.id}
                >
                  {layer.name}
                </label>
              </div>

              <div className="naxatw-flex">
                {layer.checked && (
                  <span
                    className="naxatw-p-1 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer"
                    onClick={() => {
                      dispatch(setSelectedLayer(layer));
                    }}
                  >
                    <MaterialIcon
                      name="edit"
                      className="material-icons-outlined naxatw-mt-1"
                    />
                  </span>
                )}
                <DropdownOptions options={dropdownOptions} data={layer} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
