import React from 'react';
import './dotGrid.scss';

const DotGrid = ({color, top, bottom, left, right, pos}) => {
  const numRows = 12;
  const numColumns = 12;

  const rows = Array.from({ length: numRows }, (_, rowIndex) => (
    <div className="row" key={rowIndex}>
      {Array.from({ length: numColumns }, (_, colIndex) => (
        <div className="dot" key={colIndex} style={{ backgroundColor: color }}></div>
      ))}
    </div>
  ));

  return <div className="dot-grid" style={{ bottom: bottom, top: top, left: left, Right: right, position: pos}}>{rows}</div>;
};

export default DotGrid;

  
  
