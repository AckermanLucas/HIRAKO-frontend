import React from 'react';

const MIcon = ({ name, size = 24, filled = true, style = {}, className = '', ...props }) => (
  <span
    className={`material-symbols-rounded ${className}`}
    style={{
      fontSize: `${size}px`,
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 500, 'GRAD' 0, 'opsz' ${size}`,
      lineHeight: 1,
      userSelect: 'none',
      ...style,
    }}
    {...props}
  >
    {name}
  </span>
);

export default MIcon;
