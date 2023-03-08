import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import Tab from '@Components/common/Tab';
import { analysisHeaderHeight } from '@src/constants';
import DataInput from './DataInput';
import Results from './Results';
import LayerSection from '../../LayerSection';

const tabData = [
  { id: 'dataInput', title: 'Data Input', content: <DataInput /> },
  { id: 'results', title: 'Results', content: <Results /> },
  { id: 'layers', title: 'Layers', content: <LayerSection /> },
];

const { setRouteAnalysisState } = Creators;

export default function MapSidebar() {
  const hideSidebar = useSelector(state => state.analysis.hideSidebar);
  const activeTab = useSelector(state => state.routeAnalysis.activeTab);
  const dispatch = useDispatch();

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-px-4 naxatw-overflow-auto
        scrollbar naxatw-min-w-[23rem]"
      style={{
        width: hideSidebar ? '0' : '23rem',
        minWidth: hideSidebar ? '0' : '23rem',
        padding: hideSidebar ? '0' : '',
        transition: 'ease-in-out 300ms',
      }}
    >
      <div className="naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-h-full">
        <Tab
          contentClassName={`naxatw-h-[calc(100vh-${analysisHeaderHeight}-2.2rem)]`}
          data={tabData}
          activeId={activeTab}
          onChange={tabId => {
            dispatch(
              setRouteAnalysisState({
                activeTab: tabId,
              }),
            );
          }}
        />
      </div>
    </div>
  );
}
