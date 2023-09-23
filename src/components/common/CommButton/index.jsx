import React from 'react';

// eslint-disable-next-line react/prop-types
export default function CommonBtn({ children, className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`naxatw-flex naxatw-w-fit naxatw-text-sm naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-border-[#FF5A5F] hover:naxatw-bg-[#edb4b6] ${className}`}
    >
      {children}
    </button>
  );
}
