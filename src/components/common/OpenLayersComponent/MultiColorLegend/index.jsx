import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const MultiColorLegend = ({ colors, className, onClick }) => {
  const colorArr = colors.slice(0, 4);
  return (
    <div className={`multi-color-legend ${className}`} onClick={onClick}>
      {colorArr.map(color => (
        <span key={color} style={{ background: color }} />
      ))}
    </div>
  );
};

MultiColorLegend.propTypes = {
  colors: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

MultiColorLegend.defaultProps = {
  colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
  className: '',
  onClick: () => {},
};

export default MultiColorLegend;
