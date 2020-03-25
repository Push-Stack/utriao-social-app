import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../../../../store/actions/profileActions';
const AddComment = ({ addComment, postId }) => {
  const [content, setContent] = useState('');
  const addButton = useRef();

  useEffect(() => {
    addButton.current.disabled = true;
  }, []);

  const onChangeHandler = e => {
    setContent(e.target.value);
    content.length > 0
      ? (addButton.current.disabled = false)
      : (addButton.current.disabled = true);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const contentData = { content };
    addComment(postId, contentData);
    setContent('');
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={content}
          onChange={onChangeHandler}
          name="comment"
          className="form-control "
          placeholder="Write a comment..."
          autoComplete="off"
        />
        <br />
        <button
          ref={addButton}
          type="submit"
          className="btn btn-info btn-sm pull-right "
        >
          <i className="fa fa-plus mr-1"></i> Add
        </button>
      </form>
      <div className="clearfix"></div>
      <hr />
    </React.Fragment>
  );
};

export default connect(null, { addComment })(AddComment);
