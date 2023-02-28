/* eslint-disable react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import IconButton from '@Components/common/IconButton';
import analysisInfoContents from '@src/constants/analysisInfoContents';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { analysisHeaderHeight } from '@src/constants';

// import { Creators as CommonCreators } from '@Actions/common';

// const { togglePromptDialog, toggleModal } = CommonCreators;

export default function InfoContent() {
  const { analysisType } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const selectedInfo = useSelector(state => state.analysis.selectedInfo);

  const divRefs = useRef({});

  useEffect(() => {
    divRefs.current?.[selectedInfo]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }, [selectedInfo]);

  useEffect(() => {
    setCollapsed(false);
  }, [selectedInfo]);

  return (
    <div
      className={`naxatw-absolute naxatw-top-0 naxatw-right-0  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-border naxatw-rounded-[20px] naxatw-border-grey-300 
         ${collapsed ? '' : 'naxatw-w-[22.813rem]'}`}
    >
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`naxatw-px-4 naxatw-py-2 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px] naxatw-cursor-pointer ${
          collapsed ? 'naxatw-rounded-b-[20px]' : ''
        }`}
      >
        <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
          <MaterialIcon
            name="info_outline"
            className="naxatw-text-body-icon-md"
          />
          <h4>Info</h4>
        </div>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name={collapsed ? 'expand_more' : 'expand_less'}
            // onClick={() => setCollapsed(!collapsed)}
            className="material-icons naxatw-text-icon-md"
            wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
          />
        </div>
      </div>

      {!collapsed && (
        <ul
          className="naxatw-px-5 naxatw-py-3 naxatw-pt-0 naxatw-space-y-3 naxatw-border-b
            naxatw-border-b-grey-300 last:naxatw-border-b-0 naxatw-overflow-y-auto scrollbar"
          style={{
            maxHeight: `calc(100vh - ${analysisHeaderHeight} - 6rem)`,
          }}
        >
          {Object.keys(analysisInfoContents?.[analysisType]).map(info => (
            <div
              ref={el => {
                divRefs.current[info] = el;
              }}
              className="naxatw-text-body-lg naxatw-flex naxatw-flex-col naxatw-space-y-1.5"
              dangerouslySetInnerHTML={{
                __html: analysisInfoContents?.[analysisType]?.[info],
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
