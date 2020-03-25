import React from 'react';
import { useSpring, animated } from 'react-spring';
import ProfileIntro from './profileIntro/ProfileIntro';
import Photos from './photosDisplay/PhotosDisplay';

import Post from './posts/Post';
import AddPost from './posts/addPost/AddPost';
const Timeline = () => {
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
            <div className="col col-xl-3   col-lg-6  col-md-8 col-sm-8  col-8 my-4">
              <ProfileIntro />
            </div>
            <div className="col col-xl-6  col-lg-12  col-md-12 col-sm-12 col-12 my-4">
              <AddPost />
              <br />
              <Post />
            </div>
            <div className="col col-xl-3  col-lg-6  col-md-8 col-sm-8  col-8 my-4">
              <Photos />
            </div>
          </div>
        </div>
      </animated.div>
    </React.Fragment>
  );
};

export default Timeline;
