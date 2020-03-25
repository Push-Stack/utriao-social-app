import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './DeleteAccount.css';
import { removeAlerts } from '../../../../store/actions/alertAction';
import { connect } from 'react-redux';
import { deleteUser } from '../../../../store/actions/profileActions';

const DeleteAccount = ({ deleteUser, removeAlerts }) => {
  const deleteButton = useRef();

  const [deleteData, setDeleteData] = useState({
    email: '',
    password: '',
    reason: ''
  });

  const onSubmitHandle = e => {
    deleteButton.current.disabled = true;
    removeAlerts();
    e.preventDefault();
    deleteUser(deleteData);

    deleteButton.current.disabled = false;
  };

  const onChangeHandler = e => {
    setDeleteData({
      ...deleteData,
      [e.target.name]: e.target.value
    });
  };

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
        <h6 className="font-weight-bold">Delete Account!</h6>
        <hr />
        <form onSubmit={onSubmitHandle} id="deleteAccountForm">
          <div className="row">
            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
              <div className="form-group">
                <label className="control-label deep-orange-text ">Email</label>
                <input
                  autoComplete="off"
                  name="email"
                  value={deleteData.email}
                  onChange={onChangeHandler}
                  className="form-control mt-1 special-color text-white"
                  placeholder=""
                  type="email"
                />
              </div>
              <div className="form-group">
                <label className="control-label deep-orange-text ">
                  Password
                </label>
                <input
                  autoComplete="off"
                  name="password"
                  value={deleteData.password}
                  onChange={onChangeHandler}
                  className="form-control mt-1 special-color text-white"
                  placeholder=""
                  type="password"
                />
              </div>
              <div className="form-group">
                <label className="control-label deep-orange-text ">
                  Please explain reason
                </label>
                <textarea
                  autoComplete="off"
                  name="reason"
                  value={deleteData.reason}
                  onChange={onChangeHandler}
                  className="form-control mt-1 special-color text-white"
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="form-group col col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
              <button
                type="button"
                className="form-control btn default-color-dark text-light  p-1   "
              >
                Cancel
              </button>
            </div>
            <div className="form-group col col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
              <button
                ref={deleteButton}
                type="submit"
                className="form-control btn unique-color text-light p-1   "
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </animated.div>
    </React.Fragment>
  );
};

export default connect(null, { deleteUser, removeAlerts })(DeleteAccount);
