import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';

import NavBar from '../layout/navBar/NavBar';
import AppAlert from '../layout/alert/appAlerts/AppAlerts';
import MainBlock from './mainBlock/MainBlock';
import Loading from '../layout/loading/Loading';
import {
  fetchProfile,
  getAllPosts,
  clearErrors
} from '../../store/actions/profileActions';
import About from './about/About';
import Photos from './photos/Photos';
import Followers from './followers/Followers';
import Timeline from './timeline/Timeline';

import './Profile.css';

const Profile = ({
  fetchProfile,
  getAllPosts,
  match,
  user,
  errors,
  clearErrors,
  authId
}) => {
  const [showComponents, setComponents] = useState({
    timeline: true,
    photos: false,
    about: false,
    followers: false
  });

  const showComponentMethod = value => {
    value === 'timeline' &&
      setComponents({
        timeline: true,
        photos: false,
        about: false,
        followers: false
      });

    value === 'about' &&
      setComponents({
        timeline: false,
        photos: false,
        about: true,
        followers: false
      });

    value === 'followers' &&
      setComponents({
        timeline: false,
        photos: false,
        about: false,
        followers: true
      });
    value === 'photos' &&
      setComponents({
        timeline: false,
        photos: true,
        about: false,
        followers: false
      });
  };

  useEffect(() => {
    fetchProfile(match.params.id);
    getAllPosts(match.params.id);
  }, [fetchProfile, getAllPosts, match]);

  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      delay: 1000,
      duration: 2000
    }
  });

  if (user === {} && errors === null) return <Loading />;

  if (errors !== null) {
    clearErrors();

    const origin = window.location.origin;
    window.location.href = `${origin}/profile/${authId}`;
  }

  return (
    <React.Fragment>
      <NavBar />

      <div className="container-fluid profileFluidContainer">
        <div className="profileWrapper ">
          <animated.div style={fade}>
            <AppAlert />
            <div className="mt-2"></div>
            <MainBlock showComponentState={showComponentMethod} user={user} />

            {showComponents.timeline ? <Timeline /> : null}
            {showComponents.about ? <About /> : null}

            {showComponents.photos ? <Photos /> : null}
            {showComponents.followers ? <Followers /> : null}
          </animated.div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    user: state.profile.user,
    errors: state.profile.errors,
    authId: state.auth.currentUser.id
  };
};
export default connect(mapStateToProps, {
  fetchProfile,
  getAllPosts,
  clearErrors
})(Profile);
