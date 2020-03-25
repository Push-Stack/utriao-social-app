import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './Hobbies.css';
import { removeAlerts } from '../../../../store/actions/alertAction';
import { updateHobbies } from '../../../../store/actions/profileActions';

import { connect } from 'react-redux';

const Hobbies = ({ userHobbies, updateHobbies, removeAlerts }) => {
  const updateButton = useRef();
  const [hobbiesData, setHobbiesData] = useState({
    hobbies: '',
    favouriteTvShows: '',
    favouriteMovies: '',
    favouriteWriters: '',
    favouriteGames: '',
    favouriteMusic: '',
    favouriteBooks: '',
    otherInterests: ''
  });

  useEffect(() => {
    if (userHobbies) {
      setHobbiesData({
        hobbies: userHobbies.hobbies,
        favouriteTvShows: userHobbies.favouriteTvShows,
        favouriteMovies: userHobbies.favouriteMovies,
        favouriteWriters: userHobbies.favouriteWriters,
        favouriteGames: userHobbies.favouriteGames,
        favouriteMusic: userHobbies.favouriteMusic,
        favouriteBooks: userHobbies.favouriteBooks,
        otherInterests: userHobbies.otherInterests
      });
    }
  }, [userHobbies]);

  const onChangeHandler = e => {
    setHobbiesData({
      ...hobbiesData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = e => {
    updateButton.current.disabled = true;
    removeAlerts();

    e.preventDefault();
    updateHobbies(hobbiesData);
    updateButton.current.disabled = false;
  };

  const resetHobbiesData = () => {
    setHobbiesData({
      hobbies: '',
      favouriteTvShows: '',
      favouriteMovies: '',
      favouriteWriters: '',
      favouriteGames: '',
      favouriteMusic: '',
      favouriteBooks: '',
      otherInterests: ''
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
        <h6 className="font-weight-bold">Hobbies and Interests</h6>
        <hr />
        <form onSubmit={onSubmitHandler} id="hobbiesForm">
          <div className="row">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text ">
                  Hobbies
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="hobbies"
                  value={hobbiesData.hobbies}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group label-floating">
                <label className=" form-label control-label deep-orange-text ">
                  Favourite TV Shows
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteTvShows"
                  value={hobbiesData.favouriteTvShows}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text">
                  Favourite Movies
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteMovies"
                  value={hobbiesData.favouriteMovies}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text">
                  Favourite Games
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteGames"
                  value={hobbiesData.favouriteGames}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text">
                  Favourite Music Bands / Artists
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteMusic"
                  value={hobbiesData.favouriteMusic}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group label-floating">
                <label className=" form-label control-label deep-orange-text ">
                  Favourite Books
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteBooks"
                  value={hobbiesData.favouriteBooks}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text">
                  Favourite Writers
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="favouriteWriters"
                  value={hobbiesData.favouriteWriters}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group label-floating">
                <label className="form-label control-label deep-orange-text">
                  Other Interests
                </label>
                <textarea
                  onChange={onChangeHandler}
                  name="otherInterests"
                  value={hobbiesData.otherInterests}
                  className="form-control special-color text-white"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group ">
                <button
                  onClick={resetHobbiesData}
                  type="button"
                  className="form-control btn default-color-dark text-light p-2"
                >
                  reset all
                </button>
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <button
                  ref={updateButton}
                  type="submit"
                  className="form-control btn unique-color text-light p-2"
                >
                  save all
                </button>
              </div>
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
    userHobbies: state.profile.user.hobbies
  };
};
export default connect(mapStateToProps, { updateHobbies, removeAlerts })(
  Hobbies
);
