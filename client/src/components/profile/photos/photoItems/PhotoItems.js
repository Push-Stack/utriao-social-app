import React from 'react';
import './PhotoItems.css';
import SinglePhoto from '../singlePhoto/SinglePhoto';
import { connect } from 'react-redux';
// import { useSpring, animated } from 'react-spring';

const PhotoItems = ({ posts }) => {
  return (
    <React.Fragment>
      {posts.length > 0 && (
        <div className="container bg-white my-4 p-4 photoGalleryShadow">
          <div className="row text-center text-lg-left p-1">
            {renderPhotos(posts)}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const renderPhotos = posts => {
  if (posts.length === 0) return <div></div>;
  return posts.map(post => {
    return <SinglePhoto key={post._id} post={post} />;
  });
};

const mapStateToProps = state => {
  return {
    posts: state.profile.posts
  };
};
export default connect(mapStateToProps, null)(PhotoItems);
