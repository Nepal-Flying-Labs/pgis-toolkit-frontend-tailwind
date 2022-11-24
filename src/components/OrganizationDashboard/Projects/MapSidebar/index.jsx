import React from 'react';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';

export default function MapSidebar() {
  return (
    <div className="naxatw-w-1/4 naxatw-bg-grey-100">
      <div className="naxatw-pl-10 naxatw-pr-5 naxatw-pt-5 naxatw-flex naxatw-items-center naxatw-justify-between">
        <Searchbar className="naxatw-bg-white" />

        <Button className="naxatw-btn-primary" iconLeft="add_circle_outline">
          Project
        </Button>
      </div>

      <div className="naxatw-flex">
        <div>chip1</div>
        <div>chip2</div>
      </div>

      <div>
        <div>card1</div>
        <div>card2</div>
      </div>
    </div>
  );
}
