import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import Tab from '@Components/common/Tab';
import { analysisHeaderHeight } from '@src/constants';
import DataInput from './DataInput';
import Results from './Results';

const tabData = [
  { id: 'dataInput', title: 'Data Input', content: <DataInput /> },
  { id: 'results', title: 'Results', content: <Results /> },
  { id: 'layers', title: 'Layers', content: '', disabled: true },
];

const { setRouteAnalysisState } = Creators;

export default function MapSidebar() {
  const activeTab = useSelector(state => state.routeAnalysis.activeTab);
  const dispatch = useDispatch();

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-px-4 naxatw-overflow-auto
        scrollbar naxatw-min-w-[23rem]"
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
