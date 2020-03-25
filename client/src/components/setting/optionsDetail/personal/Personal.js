import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import Loading from '../../../layout/loading/Loading';
import { removeAlerts } from '../../../../store/actions/alertAction';
import './Personal.css';
import { updatePersonal } from '../../../../store/actions/profileActions';

const Personal = ({ user, updatePersonal, removeAlerts }) => {
  const updateButton = useRef();

  const [userData, setUserData] = useState({
    username: '',
    website: '',
    birthday: '',
    phone: '',
    gender: 'Male',
    country: '',
    state: '',
    city: '',
    status: '',
    birthplace: '',
    religion: '',
    occupation: '',
    politicalIncline: '',
    facebook: '',
    twitter: '',
    instagram: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: typeof user.username !== 'undefined' ? user.username : '',
        website: typeof user.website !== 'undefined' ? user.website : '',
        birthday: typeof user.birthday !== 'undefined' ? user.birthday : '',
        phone: typeof user.phone !== 'undefined' ? user.phone : '',
        gender: typeof user.gender !== 'undefined' ? user.gender : 'Male',
        country: typeof user.country !== 'undefined' ? user.country : '',
        state: typeof user.state !== 'undefined' ? user.state : '',
        city: typeof user.city !== 'undefined' ? user.city : '',
        status: typeof user.status !== 'undefined' ? user.status : 'Single',
        birthplace:
          typeof user.birthplace !== 'undefined' ? user.birthplace : '',
        religion: typeof user.religion !== 'undefined' ? user.religion : '',
        occupation:
          typeof user.occupation !== 'undefined' ? user.occupation : '',
        politicalIncline:
          typeof user.politicalIncline !== 'undefined'
            ? user.politicalIncline
            : '',
        description:
          typeof user.description !== 'undefined' ? user.description : '',
        facebook:
          typeof user.socialLinks !== 'undefined'
            ? user.socialLinks.facebook
            : '',
        instagram:
          typeof user.socialLinks !== 'undefined'
            ? user.socialLinks.instagram
            : '',
        twitter:
          typeof user.socialLinks !== 'undefined'
            ? user.socialLinks.twitter
            : ''
      });
    }
  }, [user]);
  const onChangeHandler = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = e => {
    updateButton.current.disabled = true;
    removeAlerts();
    e.preventDefault();
    updatePersonal(userData);
    updateButton.current.disabled = false;
  };
  const resetUserData = () => {
    setUserData({
      username: userData.username,
      website: '',
      birthday: '',
      phone: '',
      gender: 'Male',
      country: '',
      state: '',
      city: '',
      status: '',
      birthplace: '',
      religion: '',
      occupation: '',
      politicalIncline: '',
      facebook: '',
      twitter: '',
      instagram: '',
      description: ''
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

  if (user === undefined) return <Loading />;

  return (
    <React.Fragment>
      <animated.div style={fade}>
        <h6 className="font-weight-bold">Personal Information</h6>
        <hr />

        <form onSubmit={onSubmitHandler} id="personalForm">
          <div className="row ">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group  label-floating">
                <label className="control-label deep-orange-text ">
                  Username
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white "
                  placeholder=""
                  type="text"
                  name="username"
                  value={userData.username}
                />
              </div>

              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your Birthday
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control special-color text-white "
                  placeholder=""
                  type="date"
                  name="birthday"
                  value={userData.birthday}
                />
              </div>
            </div>

            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your Website
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control special-color text-white "
                  placeholder=""
                  type="text"
                  name="website"
                  value={userData.website}
                />
              </div>
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text ">
                  Your Phone Number
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="phone"
                  value={userData.phone}
                />
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your Country
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="country"
                  value={userData.country}
                />
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your State/Province
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="state"
                  value={userData.state}
                />
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your City
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="city"
                  value={userData.city}
                />
              </div>
            </div>

            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating ">
                <label className="control-label deep-orange-text ">
                  Write a little description about you
                </label>
                <textarea
                  onChange={e => onChangeHandler(e)}
                  rows="4"
                  className="form-control special-color text-white pb-3  "
                  name="description"
                  value={userData.description}
                ></textarea>
              </div>

              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your Gender
                </label>

                <select
                  name="gender"
                  value={userData.gender}
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  id="exampleFormControlSelect1"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Religious Beliefs
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="religion"
                  value={userData.religion}
                />
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  BirthPlace
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="birthplace"
                  value={userData.birthplace}
                />
              </div>
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Your Occupation
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="occupation"
                  value={userData.occupation}
                />
              </div>
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">Status</label>

                <input
                  autoComplete="off"
                  type="text"
                  name="status"
                  value={userData.status}
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                />
              </div>
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text">
                  Political Incline
                </label>
                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  className="form-control text-capitalize special-color text-white"
                  placeholder=""
                  type="text"
                  name="politicalIncline"
                  value={userData.politicalIncline}
                />
              </div>
            </div>

            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
              <div className="form-group">
                <label className="form-label font-weight-bold deep-orange-text">
                  <span>
                    <i className="fa fa-facebook fa-2x text-dark "></i>
                  </span>{' '}
                  Facebook Account
                </label>

                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  type="text"
                  className="form-control special-color text-white "
                  name="facebook"
                  placeholder="Facebook Profile Link"
                  value={userData.facebook}
                />
              </div>
            </div>
            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
              <div className="form-group">
                <label className="form-label font-weight-bold deep-orange-text">
                  <span>
                    {' '}
                    <i className="fa fa-twitter fa-2x text-dark"></i>
                  </span>{' '}
                  Twitter Account
                </label>

                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  type="text"
                  className="form-control special-color text-white"
                  name="twitter"
                  placeholder="Twitter Profile Link"
                  value={userData.twitter}
                />
              </div>
            </div>

            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
              <div className="form-group">
                <label className="form-label font-weight-bold deep-orange-text">
                  <span>
                    {' '}
                    <i className="fa fa-instagram fa-2x text-dark "></i>
                  </span>{' '}
                  Instagram Account
                </label>

                <input
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  type="text"
                  className="form-control special-color text-white"
                  name="instagram"
                  placeholder="Instagram Profile Link"
                  value={userData.instagram}
                />
              </div>
            </div>
            <hr />

            <div className="form-group col col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
              <button
                type="button"
                onClick={() => resetUserData()}
                className="form-control  btn default-color-dark text-light  p-2 "
              >
                Reset all information
              </button>
            </div>

            <div className="form-group col col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
              <button
                ref={updateButton}
                type="submit"
                className="form-control  btn unique-color text-light p-2 "
              >
                Save all changes
              </button>
            </div>
          </div>
        </form>
        <hr />
      </animated.div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.profile.user
  };
};

export default connect(mapStateToProps, { updatePersonal, removeAlerts })(
  Personal
);
