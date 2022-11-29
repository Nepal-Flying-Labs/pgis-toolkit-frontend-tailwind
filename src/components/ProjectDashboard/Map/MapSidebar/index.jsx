/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Accordion from '@Components/common/Accordion';
import Button from '@Components/common/Button';
import MaterialIcon from '@Components/common/MaterialIcon';
import Searchbar from '@Components/common/Searchbar';
import { projectHeaderHeight } from '@src/constants';
import { isEmpty } from '@Utils/commonUtils';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';

const { handleCheckbox, setZoomToLayerId, setSelectedProjectTheme } =
  ProjectDashboardCreators;
const { toggleModal } = CommonCreators;

export default function MapSidebar() {
  const { organizationId } = useParams();
  const themes = useSelector(state => state.projectDashboard.themes);
  const layers = useSelector(state => state.projectDashboard.layers);
  const dispatch = useDispatch();
  const [searchValue, handleChange] = useDebouncedInput({
    ms: 300,
    init: '',
    onChange: debouncedEvent => {
      const searchText = debouncedEvent.target.value;
      const params = { organization: organizationId };
      if (!!searchText) {
        params.search = searchText;
      }
      // dispatch(getProjectsRequest(params));
    },
  });

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
      onClick: () => {},
    },
  ];

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

  return (
    <div className="naxatw-w-[30rem] naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5">
      <div className="naxatw-flex naxatw-items-center">
        <Searchbar
          className="naxatw-bg-white"
          value={searchValue}
          onChange={handleChange}
        />
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-mt-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent"
          iconLeft="tune"
        >
          Filters
        </Button>
        <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
          <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent">
            Layer Order
          </Button>
          <Button
            className="naxatw-btn-primary"
            iconLeft="add_circle_outline"
            // onClick={() => {
            //   dispatch(toggleModal('upload-layer'));
            // }}
          >
            Dataset
          </Button>
        </div>
      </div>

      <div
        className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto"
        style={{
          height: `calc(100vh - ${projectHeaderHeight} - 9rem)`,
        }}
      >
        {themes.map(theme => {
          const hasNoLayer = isEmpty(layers?.[theme.id]);
          return (
            <Accordion
              key={theme.id}
              collapsed={hasNoLayer}
              header={
                <div className="naxatw-flex naxatw-flex-col naxatw-gap-1">
                  <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                    <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                      <h5 className="naxatw-text-grey-800">{theme.name}</h5>
                      <span className="naxatw-p-1 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer">
                        <MaterialIcon name="edit" className="naxatw-mt-1" />
                      </span>
                    </div>
                    <div>
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
                        iconLeft="add_circle_outline"
                        onClick={() => {
                          dispatch(toggleModal('upload-layer'));
                          dispatch(setSelectedProjectTheme(theme));
                        }}
                      >
                        Layer
                      </Button>
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

                      <DropdownOptions options={dropdownOptions} data={layer} />
                    </div>
                  ))}
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
