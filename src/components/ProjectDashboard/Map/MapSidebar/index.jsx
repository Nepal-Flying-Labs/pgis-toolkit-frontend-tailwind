/* eslint-disable no-nested-ternary */
import Button from '@Components/common/Button/index';
import NoDataYet from '@Components/ProjectDashboard/Data/NoDataYet/index';
import { isEmpty } from '@Utils/commonUtils';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EditFeatureSection from './EditFeatureSection';
import LayerSection from './LayerSection';

export default function MapSidebar() {
  const history = useHistory();
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const themes = useSelector(state => state.projectMap.themes);
  const hideSidebar = useSelector(state => state.projectMap.hideSidebar);

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-4 naxatw-pr-4 naxatw-pt-3 naxatw-overflow-auto scrollbar"
      style={{
        width: hideSidebar ? '0' : '23rem',
        minWidth: hideSidebar ? '0' : '23rem',
        padding: hideSidebar ? '0' : '',
        transition: 'ease-in-out 300ms',
      }}
    >
      {themes !== null && isEmpty(themes) ? (
        <div className="naxatw-h-full naxatw-flex naxatw-flex-col naxatw-justify-center naxatw-items-center naxatw-pb-8">
          <NoDataYet />
          <Button
            className="naxatw-btn-primary"
            iconLeft="add"
            onClick={() => {
              history.push('data');
            }}
          >
            Data
          </Button>
        </div>
      ) : !selectedLayer ? (
        <LayerSection />
      ) : (
        <EditFeatureSection />
      )}
    </div>
  );
}
