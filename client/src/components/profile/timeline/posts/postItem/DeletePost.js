import React from 'react';
import { connect } from 'react-redux';

import { deletePost } from '../../../../../store/actions/profileActions';

const DeletePost = ({ deletePost, postId, changeShowDeletePost }) => {
  const onClickHandler = event => {
    deletePost(postId);
    changeShowDeletePost();
  };

  return (
    <React.Fragment>
      <div className="mb-4 grey lighten-3  border text-light border-light p-4 ">
        <p className="lead text-dark  small">
          Are you sure you want to delete this post?
        </p>
        <button onClick={onClickHandler.bind(this)} className="btn btn-info">
          Yes
        </button>
        <button onClick={() => changeShowDeletePost()} className="btn btn-dark">
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};
export default connect(null, { deletePost })(DeletePost);
