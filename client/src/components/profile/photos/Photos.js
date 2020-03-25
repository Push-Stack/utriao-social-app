import React from 'react';
import { useSpring, animated } from 'react-spring';

import AddPhoto from './addPhoto/AddPhoto';
import PhotoItems from './photoItems/PhotoItems';

const Photos = () => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      duration: 500
    }
  });
  return (
    <React.Fragment>
      <animated.div style={fade}>
        <div className="container mt-4">
          <div className="row mt-4">
            <AddPhoto />
            <PhotoItems />
          </div>
        </div>
      </animated.div>
    </React.Fragment>
  );
};

export default Photos;
