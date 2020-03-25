import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { editPost } from '../../../../../store/actions/profileActions';

const EditPost = ({ post, editPost, changeShowEditPost }) => {
  const [postEdit, setPostEdit] = useState({
    content: post.content || '',
    imagePath: post.imagePath || ''
  });

  const inputRef = useRef();

  const onChangeHandler = event => {
    setPostEdit({
      ...postEdit,
      [event.target.name]: event.target.value
    });
  };

  const onClickHandler = event => {
    editPost(postEdit, post._id);
    changeShowEditPost();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <div className="mb-4 grey lighten-3  border text-light border-light p-4 ">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="user">
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
            <div className="userDetail ml-2">
              <h6 className=" mt-2  mb-0 text-info font-weight-bold">
                {post.author.username}
              </h6>
              <p className="text-muted font-weight-bold  small ">
                <i className="fa fa-history ml-2"></i>{' '}
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>

        <div className="postbody mt-2 form-group">
          <textarea
            ref={inputRef}
            onChange={onChangeHandler.bind(this)}
            value={postEdit.content}
            className="form-control rgba-black-slight text-dark"
            name="content"
          ></textarea>

          {postEdit.imagePath && (
            <div className="postImage mt-4">
              <img
                alt="post"
                src={postEdit.imagePath}
                style={{ width: '50%' }}
                className="img-fluid "
              />
            </div>
          )}
        </div>

        <button onClick={onClickHandler.bind(this)} className="btn btn-info">
          Edit Post
        </button>
        <button onClick={() => changeShowEditPost()} className="btn btn-dark">
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};
export default connect(null, { editPost })(EditPost);
