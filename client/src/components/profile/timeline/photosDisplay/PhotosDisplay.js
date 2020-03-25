import React from 'react';

import { connect } from 'react-redux';
import PhotoItem from './PhotoItem';

const PhotosDisplay = ({ posts }) => {
  return (
    <React.Fragment>
      <div className="card  rounded">
        <div className="card-header font-weight-bold  bg-white ">Portfolio</div>

        <div className="d-flex flex-wrap p-4">{renderPhotos(posts)}</div>
      </div>
    </React.Fragment>
  );
};

const renderPhotos = posts => {
  if (posts.length === 0) return <div>No photos uploaded yet</div>;
  return posts.map(post => {
    return <PhotoItem key={post._id} post={post} />;
  });
};

const mapStateToProps = state => {
  return {
    posts: state.profile.posts
  };
};

export default connect(mapStateToProps, null)(PhotosDisplay);
