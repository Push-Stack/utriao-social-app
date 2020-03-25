import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import './Followers.css';
import FollowersItem from './followersItem/FollowersItem';
import FollowingItem from './followingItem/FollowingItem';

const Followers = ({ followers, following }) => {
  const [showComponent, setShowComponent] = useState({
    followers: false,
    following: false
  });

  const setComponent = () => {
    if (followers.length > 0)
      setShowComponent({ following: false, followers: true });

    if (following.length > 0 && followers.length === 0)
      setShowComponent({ followers: false, following: true });
  };

  useEffect(() => {
    setComponent();
  }, []);

  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      duration: 1000
    }
  });

  const renderFollowersItem = followers => {
    return followers.map(item => {
      return <FollowersItem key={item._id} follower={item} />;
    });
  };

  const renderFollowingItem = following => {
    return following.map(item => {
      return <FollowingItem key={item._id} following={item} />;
    });
  };

  return (
    <animated.div style={fade}>
      <div className="container my-4">
        <div className="row">
          <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 special-color-dark mt-4 ">
            <div className="d-flex justify-content-start">
              {followers.length > 0 && (
                <div
                  onClick={() => {
                    setShowComponent({ followers: true, following: false });
                  }}
                  className={`  m-2 px-3 py-2  h6   text-white  optionsFollowers ${showComponent.followers &&
                    'default-color-dark text-light'} `}
                >
                  Followers
                  <span className="text-light small ml-1">
                    ({followers.length})
                  </span>
                </div>
              )}

              {following.length > 0 && (
                <div
                  onClick={() => {
                    setShowComponent({ followers: false, following: true });
                  }}
                  className={`  m-2 px-3 py-2  h6   text-white  optionsFollowers ${showComponent.following &&
                    'default-color-dark text-light'} `}
                >
                  Following
                  <span className="text-light small ml-1">
                    ({following.length})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 bg-white mt-4 p-4 m-2">
            <div className="row">
              {showComponent.followers && renderFollowersItem(followers)}
              {showComponent.following && renderFollowingItem(following)}
            </div>
            {followers.length <= 0 && following.length <= 0 && (
              <p className="lead text-info">
                {' '}
                <span className="font-weight-bold mx-2">Followers</span> 0
              </p>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
};
const mapStateToProps = state => {
  return {
    followers: state.profile.user.followers,
    following: state.profile.user.following
  };
};
export default connect(mapStateToProps, null)(Followers);
