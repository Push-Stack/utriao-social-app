import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Comments from '../comments/Comments';
import {
  likePost,
  unlikePost
} from '../../../../../store/actions/profileActions';
import './PostItem.css';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const PostItem = ({ post, likePost, unlikePost, authUser }) => {
  const [showComment, setComment] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [showDeletePOst, setShowDeletePost] = useState(false);
  const [showPostItem, setShowPostItem] = useState(true);

  const deleteComponentRef = useRef();
  const editComponentRef = useRef();

  const changeShowEditPost = () => {
    setShowEditPost(false);
    setShowPostItem(true);
  };

  const changeShowDeletePost = () => {
    setShowDeletePost(false);
    setShowPostItem(true);
  };

  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

  const likeHandler = () => {
    likePost(post._id);
  };
  const unlikeHandler = () => {
    unlikePost(post._id);
  };
  const personLike = () => {
    if (post) {
      const { likes } = post;
      const liked = likes.find(like => like.user._id === authUser);

      return liked;
    }

    return false;
  };

  return (
    <React.Fragment>
      {showPostItem && (
        <div className="mb-4 bg-white border border-light p-4 postShadow">
          <div className="postTopBar d-flex justify-content-between  ">
            <div className="d-flex">
              <div className="userImage  ">
                <img
                  src={`${
                    post.author.avatarUrl
                      ? post.author.avatarUrl
                      : '/images/avatar.jpg'
                  }`}
                  style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                  alt="userImage"
                />
              </div>
              <div className="userDetail ml-1   ">
                <h6 className=" mt-2  mb-0">
                  <Link
                    to={`/profile/${post.author._id}`}
                    className="font-weight-bold text-info ml-1"
                  >
                    {post.author.username}
                  </Link>{' '}
                </h6>
                <p className="text-muted  small ">
                  <i className="fa fa-history ml-2"></i>{' '}
                  {moment(post.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* <div className="editOptions  "></div> */}
          </div>

          <div className="postBody my-4">
            <div className="postText ">
              {' '}
              <p className="px-2 lead overflow-auto">{post.content}</p>
            </div>

            {post.imagePath && (
              <div className="postImage">
                <img src={post.imagePath} alt="" className="img-fluid " />
              </div>
            )}
          </div>
          {authUser === post.author._id && (
            <div className="d-flex justify-content-around">
              <div
                onClick={() => {
                  setShowEditPost(true);
                  setShowPostItem(false);
                  scrollToRef(editComponentRef);
                }}
                style={{ cursor: 'pointer' }}
                className="edit small font-weight-bold
             "
              >
                <i className="fa fa-pencil mx-2"></i> Edit
              </div>
              <div
                onClick={() => {
                  setShowDeletePost(true);
                  setShowPostItem(false);
                  scrollToRef(deleteComponentRef);
                }}
                style={{ cursor: 'pointer' }}
                className="delete small font-weight-bold "
              >
                <i className="fa fa-trash mx-2"></i>Delete
              </div>
            </div>
          )}

          <hr />
          <div className="post-footer mt-4 px-2">
            <div className="d-flex justify-content-between">
              <div className="likes  ml-2">
                <p className="small text-muted setLikes">
                  {!personLike() && (
                    <i
                      onClick={likeHandler}
                      className="fa fa-thumbs-up text-info fa-2x mr-2 "
                    ></i>
                  )}
                  {personLike() && (
                    <i
                      onClick={unlikeHandler}
                      className="fa fa-thumbs-up text-danger fa-2x mr-2 "
                    ></i>
                  )}
                  Likes {post.likes.length}
                </p>
              </div>

              <div className="comments  ">
                <p
                  onClick={() => setComment(!showComment)}
                  className="small text-muted setComments"
                >
                  <i className="fa fa-comments text-info  fa-2x mr-2"></i>
                  Comments {post.comments.length}
                </p>
              </div>
            </div>

            {showComment ? (
              <div className="commentSection">
                <Comments
                  postAuthorId={post.author._id}
                  postId={post._id}
                  comments={post.comments}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}

      {authUser === post.author._id && (
        <div ref={editComponentRef}>
          {showEditPost && (
            <EditPost changeShowEditPost={changeShowEditPost} post={post} />
          )}
        </div>
      )}

      {authUser === post.author._id && (
        <div ref={deleteComponentRef}>
          {showDeletePOst && (
            <DeletePost
              changeShowDeletePost={changeShowDeletePost}
              postId={post._id}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, { likePost, unlikePost })(PostItem);
