import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../../store/actions/profileActions';
import AppAlert from '../../../layout/alert/appAlerts/AppAlerts';
const AddPhoto = ({ createPost, userId, authUserId }) => {
  const addPhoto = e => {
    const photo = new FormData();
    photo.append('content', '');
    photo.append('postImage', e.target.files[0], e.target.files[0].name);

    createPost(photo);
  };

  return (
    <React.Fragment>
      <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <AppAlert />
        <div className="d-flex bg-white  border border-dark justify-content-between  my-4">
          <div className="align-self-center border- border-danger pr-3 m-4 h4 ">
            <i className="fa fa-image fa-x mr-2"></i>
            Photo Gallery
          </div>

          {authUserId === userId && (
            <div className="upload-btn-wrapper float-right">
              <button className="btn unique-color-dark text-white">
                {' '}
                <i className="fa fa-camera fa-x mr-2 "></i> Add photo
              </button>

              <input onChange={e => addPhoto(e)} type="file" name="postImage" />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.profile.user._id,
    authUserId: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, { createPost })(AddPhoto);
