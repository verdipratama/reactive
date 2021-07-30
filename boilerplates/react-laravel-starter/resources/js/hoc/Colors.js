import React from 'react';

const Rainbow = (WrappedComponent) => {
  const colors = ['red', 'pink', 'blue', 'orange', 'green', 'yellow'];
  const randomColors = colors[Math.floor(Math.random() * 6)];
  const className = randomColors + '-text';

  return (props) => {
    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default Rainbow;
