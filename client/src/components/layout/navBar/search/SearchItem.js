import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchModalHide } from '../../../../store/actions/profileActions';
import moment from 'moment';
const SearchItem = ({ userItem, setSearchModalHide }) => {
  return (
    <li className="list-group-item  list-group-item-dark  m-2 ">
      <Link
        onClick={() => setSearchModalHide()}
        to={`/profile/${userItem._id}`}
      >
        <div className="d-flex flex-row justify-content-start">
          <div>
            {' '}
            <img
              className="img-thumbnail mr-2  "
              style={{ borderRadius: '50%', width: '50px' }}
              src={
                userItem.avatarUrl ? userItem.avatarUrl : '/images/avatar.jpg'
              }
              alt=""
            />
          </div>
          <div className="align-self-center">
            {' '}
            <h6 className="font-weight-bold text-capitalize text-dark ">
              {userItem.username}
            </h6>
            <p className="text-muted small">
              {moment(userItem.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default connect(null, { setSearchModalHide })(SearchItem);
