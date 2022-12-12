import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/projectMap';

const { toggleSidebar } = Creators;

export default function SidebarToggle() {
  const hideSidebar = useSelector(state => state.projectMap.hideSidebar);
  const dispatch = useDispatch();

  return (
    <a
      className="naxatw-absolute naxatw-top-4 naxatw-left-4 naxatw-z-10 naxatw-bg-white naxatw-text-grey-800 naxatw-w-10 naxatw-h-10 naxatw-p-2 naxatw-rounded-lg naxatw-border naxatw-border-grey-300 naxatw-shadow-3xl"
      onClick={() => dispatch(toggleSidebar())}
    >
      <i className="material-icons">
        {hideSidebar ? 'navigate_next' : 'navigate_before'}
      </i>
    </a>
  );
}
