import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Creators as CommonCreators } from '@Actions/common';
// import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { isEmpty } from '@Utils/commonUtils';
import Toggle from '@Components/common/Toggle/index';
import IconButton from '@Components/common/IconButton/index';

// const { toggleModal } = CommonCreators;
// const { setProjectMapState } = ProjectMapCreators;

export default function QueryResultPopup() {
  // const [showToolbox, setShowToolbox] = useState(false);
  const queryResults = useSelector(
    state => state.projectMap.dataQuery.queryResults,
  );
  // const dispatch = useDispatch();

  if (isEmpty(queryResults)) return '';

  return (
    <div
      className="naxatw-absolute naxatw-top-20 naxatw-right-4 naxatw-px-5 naxatw-py-3.5 naxatw-z-10
      naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
      naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div className="naxatw-flex naxatw-items-center">
        <h4>Data Query Results</h4>
        <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm">
          Clear all
        </Button>
      </div>

      <div className="naxatw-mt-3.5 naxatw-space-y-3">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <p>Road Accident</p> <p>32</p>
        </div>
        <div className="naxatw-space-y-1">
          <p className="naxatw-font-bold naxatw-text-xs naxatw-uppercase">
            Filter results
          </p>
          <p>Road = Gravel and Lane = 2</p>
        </div>
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <Toggle checked />
          <div className="naxatw-flex">
            <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm">
              Save
            </Button>
            <IconButton name="close" />
          </div>
        </div>
      </div>
    </div>
  );
}
