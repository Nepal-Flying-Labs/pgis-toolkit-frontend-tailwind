/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import MeasureControl from '@Components/common/OpenLayersComponent/Control/MeasureControl';
import PropTypes from 'prop-types';
import { FullScreen } from 'ol/control';
// import Tooltip from '@Components/common/Tooltip';
// import { comingSoonMessage } from '@src/constants';

const { toggleModal } = CommonCreators;
const { setProjectMapState } = ProjectMapCreators;

const btnClassname =
  'naxatw-p-2 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-rounded-lg hover:naxatw-bg-grey-100';

export default function Toolbox({ map }) {
  const [showToolbox, setShowToolbox] = useState(false);
  const dispatch = useDispatch();

  function fullScreenControl() {
    const control = new FullScreen({
      target: 'fullscreen',
      className: '',
    });
    return control;
  }

  useEffect(() => {
    if (!map) return;
    fullScreenControl();
    map.addControl(fullScreenControl());
  }, [map]);

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

      <div
        className={`naxatw-flex naxatw-items-center ${
          showToolbox ? '' : 'naxatw-hidden'
        }`}
      >
        <Button
          className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
          iconLeft="search"
          onClick={() => {
            dispatch(toggleModal('data-query'));
          }}
        >
          Data Query
        </Button>

        <Button
          className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
          iconLeft="travel_explore"
          onClick={() => {
            dispatch(toggleModal('analysis'));
          }}
        >
          Analysis
        </Button>

        <a
          className={btnClassname}
          onClick={() =>
            dispatch(setProjectMapState({ toggleMapExport: true }))
          }
        >
          <i className="material-symbols-outlined">download</i>
        </a>

        <div className={`naxatw-relative ${btnClassname} naxatw-pt-3`}>
          <MeasureControl
            map={map}
            buttonText={<i className="material-icons">straighten</i>}
            measureBoth
          />
        </div>

        {/* <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">straighten</i>
        </a> */}

        <div className={btnClassname} id="fullscreen">
          <a onClick={() => {}}>
            <i className="material-icons">fullscreen</i>
          </a>
        </div>

        {/* <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">info_outline</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">undo</i>
        </a>

        <a className={btnClassname} onClick={() => {}}>
          <i className="material-icons">redo</i>
        </a> */}
      </div>
    </div>
  );
}

Toolbox.propTypes = {
  map: PropTypes.object,
};
