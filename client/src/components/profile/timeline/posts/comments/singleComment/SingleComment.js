import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { removeComment } from '../../../../../../store/actions/profileActions';
import EditComment from './EditComment';
const SingleComment = ({
  comment,
  authUser,
  postId,
  removeComment,
  postAuthorId
}) => {
  const { user, content, createdAt } = comment;
  const [showComment, setShowComment] = useState(true);
  const [showEditComment, setShowEditComment] = useState(false);
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      duration: 500
    }
  });

  const onClickHandler = event => {
    removeComment(postId, comment._id, postAuthorId);
  };

  const changeShowComment = () => {
    setShowComment(true);
    setShowEditComment(false);
  };

  return (
    <React.Fragment>
      <animated.div style={fade}>
        {showComment && (
          <div className="mt-2  border-bottom border-light">
            <li className="media ">
              <Link to={`/profile/${user._id}`} className="pull-left">
                <img
                  src={`${user ? user.avatarUrl : '/images/avatar.jpg'}`}
                  alt=""
                  className="img-circle"
                  style={{
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    border: '2px solid #e5e7e8'
                  }}
                />
              </Link>
              <div className="media-body  ">
                <span className="text-muted pull-right">
                  <small className="text-muted">
                    {moment(createdAt).fromNow()}
                  </small>
                </span>
                <Link to={`/profile/${user._id}`} className="nav-link p-0 m-0">
                  <strong className="text-dark font-weight-bold small ml-2 text-capitalize  ">
                    {user.username}
                  </strong>
                </Link>

                <p className=" ml-2 small ">{content}</p>
              </div>
            </li>

            <div className="d-flex justify-content-between mt-2 ml-4">
              {authUser === user._id && (
                <div className="edit mx-2 ">
                  <p
                    style={{ cursor: 'pointer' }}
                    className="text-info small font-weight-bold "
                    onClick={() => {
                      setShowComment(false);
                      setShowEditComment(true);
                    }}
                  >
                    Edit
                  </p>
                </div>
              )}

              {authUser === user._id || authUser === postAuthorId ? (
                <div className="delete ">
                  <p
                    onClick={onClickHandler.bind(this)}
                    style={{ cursor: 'pointer' }}
                    className=" text-info small font-weight-bold ml-2 "
                  >
                    Delete
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {showEditComment && (
          <EditComment
            postAuthorId={postAuthorId}
            showComment={changeShowComment}
            postId={postId}
            comment={comment}
          />
        )}
      </animated.div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, { removeComment })(SingleComment);
