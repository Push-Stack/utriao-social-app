import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../../../../../../store/actions/profileActions';
const EditComment = ({
  comment,
  postId,
  editComment,
  showComment,
  postAuthorId
}) => {
  const { user, content } = comment;
  const [commentData, setComment] = useState({
    content: content
  });

  const inputElementRef = useRef();

  useEffect(() => {
    inputElementRef.current.focus();
  }, []);

  const onChangeHandler = event => {
    setComment({
      content: event.target.value
    });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    editComment(postId, comment._id, commentData, postAuthorId);
    showComment();
  };

  const onClickHandler = event => {
    editComment(postId, comment._id, commentData, postAuthorId);
    showComment();
  };

  return (
    <React.Fragment>
      <div className="mt-2 border-bottom border-light grey lighten-3 p-4">
        <li className="media ">
          <img
            alt="user"
            src={`${user ? user.avatarUrl : '/images/avatar.jpg'}`}
            className="img-circle"
            style={{
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              border: '2px solid #e5e7e8'
            }}
          />
          <div className="media-body  ">
            <strong className="text-dark font-weight-bold small ml-2  text-capitalize  ">
              {user.username}
            </strong>
            <form onSubmit={onSubmitHandler.bind(this)}>
              <input
                name="content"
                ref={inputElementRef}
                value={commentData.content}
                onChange={onChangeHandler.bind(this)}
                type="text"
                className="form-control mt-2  rgba-black-slight text-dark"
              />
            </form>
          </div>
        </li>
        <button onClick={onClickHandler} className="btn btn-sm btn-info m-4   ">
          Save
        </button>
        <button
          onClick={() => showComment()}
          className="btn btn-sm btn-dark m-4   "
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};
export default connect(null, { editComment })(EditComment);
