import React from 'react';

// eslint-disable-next-line react/prop-types
function FlexColumn({ children, className }) {
  return (
    <div className={`naxatw-flex naxatw-flex-col ${className}`}>{children}</div>
  );
}

export default FlexColumn;
