import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Links({ children, className, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`naxatw-btn-link naxatw-flex naxatw-w-fit naxatw-text-sm naxatw-px-5 naxatw-py-3 naxatw-rounded-lg ${className}`}
    >
      {children}
    </Link>
  );
}
