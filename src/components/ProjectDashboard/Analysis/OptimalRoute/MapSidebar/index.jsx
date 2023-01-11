import React from 'react';
import Tab from '@Components/common/Tab';
import DataInput from './DataInput';

const tabData = [
  { id: 1, title: 'Data Input', content: <DataInput /> },
  { id: 2, title: 'Results', content: '', disabled: true },
  { id: 3, title: 'Layers', content: '', disabled: true },
];

export default function MapSidebar() {
  return (
    <div
      className="naxatw-bg-grey-100 naxatw-px-4 naxatw-overflow-auto
        scrollbar naxatw-min-w-[23rem]"
    >
      <div className="naxatw-flex naxatw-flex-col naxatw-gap-2">
        <div>
          <Tab data={tabData} />
        </div>
      </div>
    </div>
  );
}
