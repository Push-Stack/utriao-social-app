import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import EducationItem from './EducationItem';
import AddEducation from './AddEducation';
import './Education.css';

const Education = ({ educationArray }) => {
  const [showAll, setShowAll] = useState(true);
  const [add, setAdd] = useState(false);

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
        <h6 className="font-weight-bold ">Education</h6>

        <hr />
        <div className="d-flex flex row">
          <button
            onClick={() => {
              setShowAll(true);
              setAdd(false);
            }}
            className={`btn default-color-dark text-light rounded-top mb-4 ${showAll &&
              'unique-color-dark border border-info  '}`}
          >
            <i className="fa fa-toggle-on mr-2"></i>
            Show All
          </button>
          <button
            onClick={() => {
              setShowAll(false);
              setAdd(true);
            }}
            className={`btn unique-color text-light rounded-top mb-4 ${add &&
              'unique-color-dark border border-info'} `}
          >
            {' '}
            <i className="fa fa-plus mr-2 "></i>
            Add
          </button>
        </div>
        {showAll && renderEducationItems(educationArray)}
        {add && <AddEducation />}

        <hr />
      </animated.div>
    </React.Fragment>
  );
};

const renderEducationItems = educationArray => {
  if (educationArray.length === 0)
    return (
      <div>
        <p className="lead small default-color-dark text-light p-2">
          Click on Add Button to add education
        </p>{' '}
      </div>
    );

  return educationArray.map(item => (
    <EducationItem key={item._id} educationItem={item} />
  ));
};

const mapStateToProps = state => {
  return {
    educationArray: state.profile.user.education
  };
};

export default connect(mapStateToProps, null)(Education);
