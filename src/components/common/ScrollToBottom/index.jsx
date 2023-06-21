/* eslint-disable react/prop-types */
import React from 'react';
import IconButton from '../IconButton';

export default function ScrollToBottom({ handleClick }) {
  return (
    <div
      className="naxatw-fixed naxatw-bottom-[6.2rem] naxatw-left-[18.5rem] naxatw-bg-white
        naxatw-p-1.5 naxatw-rounded-full naxatw-shadow-3xl naxatw-border naxatw-border-grey-300
        hover:naxatw-bg-grey-100 naxatw-z-50"
    >
      <IconButton
        className="material-symbols-outlined naxatw-text-[1.2rem] naxatw-text-secondary-500"
        name="arrow_downward"
        title="Scroll to Bottom"
        onClick={handleClick}
      />
    </div>
  );
}
