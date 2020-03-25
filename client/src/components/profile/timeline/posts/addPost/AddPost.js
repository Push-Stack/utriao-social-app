import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { createPost } from '../../../../../store/actions/profileActions';
import AppAlert from '../../../../layout/alert/appAlerts/AppAlerts';

Modal.setAppElement('#root');
const AddPost = ({ createPost, authUser, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showImage, setShowImage] = useState('');
  const [post, setPost] = useState({ content: '', postImage: '' });

  const inputRef = useRef();
  const styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minHeight: '50vh',
      width: '40vh',
      boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
      border: '0px solid #000000'
    }
  };

  const onChangeHandler = event => {
    if (event.target.files) {
      setShowImage(URL.createObjectURL(event.target.files[0]));
      setPost({ ...post, postImage: event.target.files[0] });
    }
  };

  const onClickHandler = event => {
    inputRef.current.click();
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    const newPost = new FormData();
    post.content
      ? newPost.append('content', post.content)
      : newPost.append('content', '');
    post.postImage
      ? newPost.append('postImage', post.postImage, post.postImage.name)
      : newPost.append('postImage', null);

    if (!post.content && !post.postImage) return;

    createPost(newPost);
    setPost({ content: '', postImage: '' });
    setShowImage('');
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      {currentUser === authUser && (
        <div>
          <AppAlert />
          <div className="bg-white mt-1 p-2">
            {' '}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-dark btn-lg"
            >
              Create Post
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => {
              setShowImage('');
              setIsOpen(false);
              setPost({ content: '', postImage: '' });
            }}
            style={styles}
          >
            <h3>Create Post</h3>

            <hr />
            <form onSubmit={onSubmitHandler.bind(this)}>
              <div className="form-group">
                <label htmlFor="description" className="form-label ">
                  Write something here..
                </label>
                <textarea
                  onChange={event =>
                    setPost({ ...post, content: event.target.value })
                  }
                  name="content"
                  value={post.content}
                  className="form-control "
                  id="description"
                  cols="2"
                  rows="2"
                ></textarea>
              </div>
              <input
                name="postImage"
                onChange={onChangeHandler.bind(this)}
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
              />
              {!showImage && (
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={onClickHandler.bind(this)}
                >
                  Add Image
                </button>
              )}

              {showImage && (
                <div
                  className=" mt-2 d-flex justify-content-center"
                  style={{ height: '100px', width: '200px' }}
                >
                  <div>
                    <img
                      alt="post"
                      style={{ width: '100%', height: '160px' }}
                      className="img-fluid d-block "
                      src={showImage}
                    />
                  </div>

                  <div className="bg-dark">
                    <i
                      onClick={() => setShowImage('')}
                      style={{ marginLeft: '-20px', cursor: 'pointer' }}
                      className="fa fa-trash fa-x text-white bg-dark p-1 "
                    ></i>
                  </div>
                </div>
              )}

              <div className="fixed-bottom bg-transparent d-flex justify-content-around p-2">
                <button type="submit" className="btn btn-dark ">
                  Create
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-danger  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.currentUser.id,
    currentUser: state.profile.user._id
  };
};

export default connect(mapStateToProps, { createPost })(AddPost);
