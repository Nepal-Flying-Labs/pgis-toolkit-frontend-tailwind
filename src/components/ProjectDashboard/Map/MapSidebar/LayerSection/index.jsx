/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import { projectHeaderHeight } from '@src/constants';
import LayerOrder from './LayerOrder';
import LayerList from './LayerList';

const { setSidebarContent } = ProjectMapCreators;

export default function LayerSection() {
  const { organizationId } = useParams();
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
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

  return (
    <>
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
          height: `calc(100vh - ${projectHeaderHeight} - 9rem)`,
        }}
      >
        {sidebarContent === 'layer-order' ? <LayerOrder /> : <LayerList />}
      </div>
    </>
  );
}
