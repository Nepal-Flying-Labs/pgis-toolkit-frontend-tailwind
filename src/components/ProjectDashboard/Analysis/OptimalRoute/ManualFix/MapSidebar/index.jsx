import React from 'react';
import Button from '@Components/common/Button';
import IconButton from '@Components/common/IconButton';
import Tab from '@Components/common/Tab';
import Errors from './Errors';
import Layers from './Layers';

const tabData = [
  { id: 1, title: 'Errors', content: <Errors /> },
  { id: 2, title: 'Layers', content: <Layers />, disabled: true },
];

export default function MapSidebar() {
  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-4 naxatw-pr-4 naxatw-pt-3
        naxatw-overflow-auto scrollbar naxatw-min-w-[23rem]"
    >
      <div className="naxatw-flex naxatw-flex-col naxatw-gap-2">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
            <IconButton name="arrow_back" />
            <h4>Road</h4>
          </div>
          <Button className="naxatw-btn-primary">Save</Button>
        </div>

        <div
          className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col naxatw-gap-5"
          style={{
            height: `calc(100vh - 6.2rem - 9rem)`,
          }}
        >
          <Tab data={tabData} />
        </div>
      </div>
    </div>
  );
}
