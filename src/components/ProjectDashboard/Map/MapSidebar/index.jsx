/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import Tab from '@Components/common/Tab';
import LayerSection from './LayerSection';
import AnalysisSection from './AnalysisSection';

const tabData = [
  { id: 1, title: 'Layers', content: <LayerSection /> },
  { id: 2, title: 'Analysis', content: <AnalysisSection /> },
];

export default function MapSidebar() {
  const hideSidebar = useSelector(state => state.projectMap.hideSidebar);

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-4 naxatw-pr-4 naxatw-overflow-auto
        naxatw-border-r naxatw-border-grey-300 scrollbar"
      style={{
        width: hideSidebar ? '0' : '23rem',
        minWidth: hideSidebar ? '0' : '23rem',
        padding: hideSidebar ? '0' : '',
        transition: 'ease-in-out 300ms',
      }}
    >
      <Tab data={tabData} />
    </div>
  );
}
