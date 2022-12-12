import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/projectMap';
import Button from '@Components/common/Button';

const btnClassname =
  'naxatw-p-2  naxatw-h-10 naxatw-flex naxatw-items-center naxatw-rounded-lg hover:naxatw-bg-grey-100';

export default function Toolbox() {
  const [showToolbox, setShowToolbox] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="naxatw-absolute naxatw-top-4 naxatw-right-4 naxatw-px-2 naxatw-py-1 naxatw-z-10 naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-lg naxatw-border naxatw-border-grey-300 naxatw-flex naxatw-items-center naxatw-shadow-3xl">
      <a className={btnClassname} onClick={() => setShowToolbox(!showToolbox)}>
        <i className="material-icons">
          {showToolbox ? 'navigate_next' : 'navigate_before'}
        </i>
        {!showToolbox && (
          <p className="naxatw-text-body-sm naxatw-font-bold">TOOLBOX</p>
        )}
      </a>

      <div className={`naxatw-flex ${showToolbox ? '' : 'naxatw-hidden'}`}>
        <Button
          className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
          iconLeft="search"
        >
          Data Query
        </Button>

        <Button
          className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
          iconLeft="travel_explore"
        >
          Analysis
        </Button>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-symbols-outlined">download</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">straighten</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">fullscreen</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">info_outline</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">undo</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">redo</i>
        </a>
      </div>
    </div>
  );
}
