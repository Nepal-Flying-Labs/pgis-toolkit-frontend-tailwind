import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/analysis';

const { toggleSidebar } = Creators;

export default function SidebarToggle() {
  const hideSidebar = useSelector(state => state.analysis.hideSidebar);
  const dispatch = useDispatch();

  return (
    <a
      className="naxatw-absolute naxatw-top-4 naxatw-left-4 naxatw-z-10 naxatw-bg-white
        naxatw-text-grey-800 naxatw-h-10 naxatw-p-2 naxatw-rounded-lg naxatw-border
        naxatw-border-grey-300 naxatw-flex naxatw-items-center hover:naxatw-bg-grey-100"
      onClick={() => dispatch(toggleSidebar())}
    >
      <i className="material-icons">
        {hideSidebar ? 'navigate_next' : 'navigate_before'}
      </i>
    </a>
  );
}
