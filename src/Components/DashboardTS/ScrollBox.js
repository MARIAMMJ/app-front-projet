import React from 'react';

function ScrollBox(props) {
  return (
    <div style={{ overflow: 'scroll', height: '200px', border: '1px solid #ccc', padding: '10px' }}>
      {props.children}
    </div>
  );
}

export default ScrollBox;