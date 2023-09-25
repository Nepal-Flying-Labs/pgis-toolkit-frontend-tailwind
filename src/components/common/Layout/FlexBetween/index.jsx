import React from 'react';

// eslint-disable-next-line react/prop-types
function FlexBetween({ children, className }) {
  return (
    <div className={`naxatw-flex naxatw-justify-between ${className}`}>
      {children}
    </div>
  );
}

export default FlexBetween;
