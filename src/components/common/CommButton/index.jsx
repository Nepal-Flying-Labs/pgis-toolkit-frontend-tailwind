import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function CommonBtn({ children, className, onClick, to }) {
  return (
    <Link
      type="button"
      onClick={onClick}
      className={`naxatw-flex naxatw-text-sm naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-border-[#FF5A5F] hover:naxatw-bg-[#edb4b6] ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
}
