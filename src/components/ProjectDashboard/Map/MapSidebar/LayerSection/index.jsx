/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import LayerOrder from './LayerOrder';
import LayerList from './LayerList';

const { setSidebarContent, setSearchText } = ProjectMapCreators;

export default function LayerSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const searchText = useSelector(state => state.projectMap.searchText);
  const dispatch = useDispatch();

  return (
    <>
      <div className="naxatw-flex naxatw-items-center">
        <Searchbar
          className="naxatw-bg-white"
          value={searchText}
          onChange={e => {
            dispatch(setSearchText(e.target.value));
          }}
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
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent"
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
        className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${projectHeaderHeight}px - 9rem)`,
        }}
      >
        {sidebarContent === 'layer-order' ? <LayerOrder /> : <LayerList />}
      </div>
    </>
  );
}
