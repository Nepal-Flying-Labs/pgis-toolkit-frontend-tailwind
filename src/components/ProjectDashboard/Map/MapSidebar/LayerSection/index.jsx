/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useHistory } from 'react-router';
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
  const history = useHistory();
  const dispatch = useDispatch();

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
        {/* <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent naxatw-btn-sm"
          onClick={() => {
            dispatch(
              setSidebarContent(
                sidebarContent === 'layer-order' ? '' : 'layer-order',
              ),
            );
          }}
        >
          Filters
        </Button> */}
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
        {sidebarContent === 'layer-order' ? <LayerOrder /> : <LayerList />}
      </div>
    </>
  );
}
