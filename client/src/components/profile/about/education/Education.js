import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Education = ({ education, userId, authUser }) => {
  const renderEducationData = education => {
    if (!education) return null;
    return education.map(educationItem => {
      let { title, startingYear, endingYear, description } = educationItem;

      startingYear = moment(startingYear).format('YYYY');
      endingYear = moment(endingYear).format('YYYY');

      return (
        <div
          key={educationItem._id}
          className=" col col-lg-6 col-md-6 col-sm-12 col-12   "
        >
          <h6 className="d-inline text-capitalize text-white">{title}</h6>
          <span className="d-block small   text-warning ">
            {`( ${startingYear} -  ${endingYear} )`}
          </span>
          <p className=" small mt-1 text-info ">{description}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <React.Fragment>
        <div className="education unique-color-dark my-2 p-4 rounded text-white  ">
          <h6 className="  font-weight-bold mdb-color darken-3 text-light  p-4">
            Education
            {userId === authUser && (
              <Link to="/setting">
                <i className="fa fa-sliders ml-2 float-right text-white"></i>
              </Link>
            )}
          </h6>
          {education && education.length === 0 && (
            <div className="p-4 mt-3">
              {userId === authUser && (
                <p className=" text-light">
                  No education field is added yet...
                </p>
              )}
              {userId !== authUser && (
                <p className=" text-light">
                  No data is entered from user side...
                </p>
              )}
              {userId === authUser && (
                <Link to="/setting" className="text-info  ">
                  Click on to navigate to settings
                </Link>
              )}
            </div>
          )}

          <div className="row p-4">{renderEducationData(education)}</div>
        </div>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    education: state.profile.user.education,
    userId: state.profile.user._id,
    authUser: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, null)(Education);
