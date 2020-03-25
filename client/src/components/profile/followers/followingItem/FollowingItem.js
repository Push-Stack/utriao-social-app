import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

const FollowingItem = ({ following }) => {
  let { _id, username, coverUrl, avatarUrl, createdAt } = following;

  if (typeof avatarUrl === 'undefined') avatarUrl = '/images/avatar.jpg';
  if (typeof coverUrl === 'undefined') coverUrl = '/images/settingCover.png';

  createdAt = moment(createdAt).fromNow();

  return (
    <React.Fragment>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 p-2 ">
        <div className="card  followerBorderShadow border-light ">
          <img
            src={coverUrl}
            className="card-img-top"
            alt="user"
            style={{ height: '120px' }}
          />
          <div className="card-body text-center">
            <img
              src={avatarUrl}
              alt=""
              style={{
                borderRadius: '50%',
                border: '2px solid whitesmoke',
                width: '100px',
                height: '100px',
                marginTop: '-50px',
                marginLeft: '0 2%',
                position: 'relative',
                zIndex: '1'
              }}
            />
            <Link to={`/profile/${_id}`} className="text-danger">
              <h5 className="card-title mt-2  ">{username}</h5>
            </Link>
            <p className="card-text">Joined {createdAt}</p>

            <Link
              to={`/profile/${_id}`}
              className="card-link btn btn-sm btn-danger"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FollowingItem;
