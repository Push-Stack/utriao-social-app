import React, { useState, useEffect } from 'react';
import { removeAlerts } from '../../../../store/actions/alertAction';
import { connect } from 'react-redux';
import {
  updateEducation,
  deleteEducation
} from '../../../../store/actions/profileActions';

const EducationItem = ({
  educationItem,
  updateEducation,
  deleteEducation,
  removeAlerts
}) => {
  useEffect(() => {
    setEducation({
      title: typeof educationItem === 'undefined' ? '' : educationItem.title,
      startingYear:
        typeof educationItem === 'undefined' ? '' : educationItem.startingYear,
      endingYear:
        typeof educationItem === 'undefined' ? '' : educationItem.endingYear,
      description:
        typeof educationItem === 'undefined' ? '' : educationItem.description
    });
  }, [educationItem]);

  const [education, setEducation] = useState({
    title: '',
    startingYear: '',
    endingYear: '',
    description: ''
  });

  const onChangeHandler = e => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    removeAlerts();
    updateEducation(education, educationItem._id);
  };

  const onClickDelete = () => {
    removeAlerts();
    deleteEducation(educationItem._id);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler} id="educationForm">
        <div className="row">
          <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group label-floating">
              <label className="control-label form-label deep-orange-text ">
                Title or Place
              </label>
              <input
                autoComplete="off"
                name="title"
                value={education.title}
                onChange={onChangeHandler}
                type="text"
                className="form-control special-color text-white text-capitalize"
              />
            </div>
          </div>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="form-group label-floating">
              <label className="control-label form-label deep-orange-text ">
                Starting Year
              </label>
              <input
                autoComplete="off"
                name="startingYear"
                value={education.startingYear}
                onChange={onChangeHandler}
                type="date"
                className="form-control special-color text-white"
              />
            </div>
          </div>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="form-group label-floating">
              <label className="control-label form-label deep-orange-text ">
                Ending Year
              </label>
              <input
                autoComplete="off"
                name="endingYear"
                value={education.endingYear}
                onChange={onChangeHandler}
                type="date"
                className="form-control special-color text-white"
              />
            </div>
          </div>
          <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group label-floating">
              <label className="control-label form-label deep-orange-text ">
                Description
              </label>
              <textarea
                autoComplete="off"
                name="description"
                value={education.description}
                onChange={onChangeHandler}
                className="form-control special-color text-white"
                cols="30"
                rows="1"
              ></textarea>
            </div>
          </div>

          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn default-color-dark text-light p-2"
              >
                Update
              </button>
            </div>
          </div>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="form-group">
              <button
                onClick={onClickDelete}
                type="button"
                className="form-control btn unique-color text-light p-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default connect(null, {
  updateEducation,
  deleteEducation,
  removeAlerts
})(EducationItem);
