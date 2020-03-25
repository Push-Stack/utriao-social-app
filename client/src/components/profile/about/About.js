import React from 'react';
import { useSpring, animated } from 'react-spring';
import Personal from './personal/Personal';
import Hobbies from './hobbies/Hobbies';
import Education from './education/Education';

const About = () => {
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
        <div className="container">
          <div className="row">
            <div className="col col-xl-4 order-xl-1 col-lg-5 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
              <Personal />
            </div>
            <div className="col col-xl-8 order-xl-2 col-lg-7 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12 ">
              <Hobbies />
              <Education />
            </div>
          </div>
        </div>
      </animated.div>
    </React.Fragment>
  );
};

export default About;
