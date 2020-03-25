import React from 'react';

const Loading = () => {
  return (
    <React.Fragment>
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Loading;
