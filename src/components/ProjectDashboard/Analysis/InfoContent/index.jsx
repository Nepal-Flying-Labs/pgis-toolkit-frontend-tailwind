/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import IconButton from '@Components/common/IconButton';
import analysisInfoContents from '@src/constants/analysisInfoContents';
// import { Creators as CommonCreators } from '@Actions/common';

// const { togglePromptDialog, toggleModal } = CommonCreators;

export default function InfoContent() {
  const { analysisType } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const selectedInfo = useSelector(state => state.analysis.selectedInfo);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  return (
    <div
      className="naxatw-absolute naxatw-top-5 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[21.2rem]"
    >
      <div
        className={`naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px] ${
          collapsed ? 'naxatw-rounded-b-[20px]' : ''
        }`}
      >
        <h4>Info</h4>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name={collapsed ? 'expand_more' : 'expand_less'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </div>

      {!collapsed && (
        <ul
          className="naxatw-px-5 naxatw-py-3.5 naxatw-space-y-3 naxatw-border-b
            naxatw-border-b-grey-300 last:naxatw-border-b-0 naxatw-overflow-y-auto scrollbar"
          style={{
            maxHeight: `calc(100vh - ${projectHeaderHeight}px - 14rem)`,
          }}
        >
          <div
            className="naxatw-text-body-md naxatw-mb-3"
            dangerouslySetInnerHTML={{
              __html: selectedInfo
                ? analysisInfoContents?.[analysisType]?.[selectedInfo]
                : analysisInfoContents?.[analysisType]?.default,
            }}
          />
        </ul>
      )}
    </div>
  );
}
