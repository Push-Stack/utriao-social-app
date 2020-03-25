import React from 'react';
import SingleComment from '../singleComment/SingleComment';

const CommentList = ({ comments, postId, postAuthorId }) => {
  const renderComments = comments => {
    if (comments.length === 0)
      return <div className=" text-muted p-2 ">No comments on this post</div>;

    return comments.map(comment => (
      <SingleComment
        postAuthorId={postAuthorId}
        key={comment._id}
        postId={postId}
        comment={comment}
      />
    ));
  };
  return <React.Fragment>{renderComments(comments)}</React.Fragment>;
};

export default CommentList;
