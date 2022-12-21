/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './styles.css';

export default function Tooltip({ children, delay = 0, direction, content }) {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    if (delay === 0) {
      setActive(true);
      return;
    }
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    if (delay === 0) {
      setActive(false);
      return;
    }
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || 'top'}`}>{content}</div>
      )}
    </div>
  );
}
