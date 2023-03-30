/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { Creators as CommonCreators } from '@Actions/common';
import toastActions from '@Actions/toast';
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
const { togglePromptDialog, toggleModal } = CommonCreators;

export default function LayerSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const projectAreaLayerId = useSelector(
    state => state.projectMap.projectAreaLayerId,
  );
  const searchText = useSelector(state => state.projectMap.searchText);
  const history = useHistory();
  const dispatch = useDispatch();

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
    {
      id: 'attribute-table',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2">table_chart</i>
          <p className="naxatw-text-body-lg">Attribute Table</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setProjectMapState({
            selectedLayer: data,
          }),
        );
        dispatch(toggleModal('view-layer-attribute'));
      },
    },
    {
      id: 'manage-attribute',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2 naxatw-text-[22px]">
            database
          </i>
          <p className="naxatw-text-body-lg">Manage Attribute</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setProjectMapState({
            selectedLayer: data,
          }),
        );
        dispatch(toggleModal('manage-attributes'));
      },
    },
    {
      id: 'add-feature',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">add</i>
          <p className="naxatw-text-body-lg">Add Feature</p>
        </span>
      ),
      onClick: data => {
        if (data.id === projectAreaLayerId) {
          dispatch(
            toastActions.error({
              message: 'Cannot add feature to Project Area.',
            }),
          );
          return;
        }
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
      id: 'delete-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-delete_btn">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-delete_btn">Delete</p>
        </span>
      ),
      onClick: data => {
        if (data.id === projectAreaLayerId) {
          dispatch(
            toastActions.error({ message: 'Project Area cannot be removed.' }),
          );
          return;
        }
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
          marginRight: '-0.7125rem',
          paddingRight: '0.25rem',
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
