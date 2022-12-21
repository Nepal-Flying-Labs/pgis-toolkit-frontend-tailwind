/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import LayerOrder from './LayerOrder';
import LayerList from './LayerList';

const {
  setSidebarContent,
  setSearchText,
  setZoomToLayerId,
  setDeleteLayer,
  setProjectMapState,
} = ProjectMapCreators;
const { togglePromptDialog } = CommonCreators;

export default function LayerSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const searchText = useSelector(state => state.projectMap.searchText);
  const history = useHistory();
  const dispatch = useDispatch();

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
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">add</i>
          <p className="naxatw-text-body-lg">Add Feature</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setProjectMapState({
            selectedLayer: data,
            sidebarContent: 'add-feature',
            drawType: 'add-feature',
          }),
        );
      },
    },
    {
      id: 3,
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
    <>
      <div className="naxatw-flex naxatw-items-center">
        <Searchbar
          className="naxatw-bg-white"
          isSmall
          value={searchText}
          onChange={e => {
            dispatch(setSearchText(e.target.value));
          }}
        />
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-mt-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent naxatw-btn-sm"
          onClick={() => {
            dispatch(
              setSidebarContent(
                sidebarContent === 'layer-order' ? '' : 'layer-order',
              ),
            );
          }}
        >
          {sidebarContent === 'layer-order' ? 'Category' : 'Layer Order'}
        </Button>
        <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
          <Button
            className="naxatw-btn-primary naxatw-btn-sm"
            iconLeft="add"
            onClick={() => {
              history.push('data');
            }}
          >
            Add Data
          </Button>
        </div>
      </div>

      <div
        className="naxatw-mt-3 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${projectHeaderHeight}px - 7.7rem)`,
        }}
      >
        {sidebarContent === 'layer-order' ? (
          <LayerOrder dropdownOptions={dropdownOptions} />
        ) : (
          <LayerList dropdownOptions={dropdownOptions} />
        )}
      </div>
    </>
  );
}
