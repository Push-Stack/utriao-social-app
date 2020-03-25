import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './ChangeEmail.css';
import { connect } from 'react-redux';
import { removeAlerts } from '../../../../store/actions/alertAction';
import { changeEmail } from '../../../../store/actions/profileActions';

const ChangeEmail = ({
  userEmail,
  userEmailChanged,
  changeEmail,
  removeAlerts
}) => {
  const [emailData, setEmail] = useState({
    email: ''
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    removeAlerts();
    changeEmail(emailData);
  };

  const onChangeHandler = e => {
    setEmail({
      email: e.target.value
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
        <h6 className="font-weight-bold">Change Email</h6>
        <hr />

        <form onSubmit={onSubmitHandler} id="changeEmailForm">
          <div className="row">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <p className="lead small my-2 bg-info text-white p-2">
                <i className="fa fa-envelope mr-1"></i> {userEmail}
              </p>

              <div className="form-group label-floating">
                {!userEmailChanged && (
                  <label className="control-label deep-orange-text ">
                    Your New Email
                  </label>
                )}

                {!userEmailChanged && (
                  <input
                    autoComplete="off"
                    name="email"
                    value={emailData.email}
                    onChange={onChangeHandler}
                    type="text"
                    className="form-control special-color text-white"
                  />
                )}
                {!userEmailChanged && (
                  <div className="small lead p-2 ">
                    <i className="fa fa-warning deep-orange-text "></i>One time
                    Email change is allowed.
                  </div>
                )}
              </div>
            </div>

            {!userEmailChanged && (
              <div className="mt-2 text-center form-group col col-lg-12 col-sm-12 col-sm-12 col-12">
                <button
                  type="submit"
                  className="form-control btn default-color-dark text-light p-2   "
                >
                  Change Email Now!
                </button>
              </div>
            )}
          </div>
        </form>

        {userEmailChanged && (
          <p className="text-info elegant-color p-2  h6">
            <i className="fa fa-exclamation-triangle text-info"></i> Limit for
            changing email is exceeded
          </p>
        )}
      </animated.div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.auth.currentUserDetail.email,
    userEmailChanged: state.auth.currentUserDetail.emailChanged
  };
};

export default connect(mapStateToProps, { changeEmail, removeAlerts })(
  ChangeEmail
);
