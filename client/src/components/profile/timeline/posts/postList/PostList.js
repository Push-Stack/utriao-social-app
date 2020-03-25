import React from 'react';
import PostItem from '../postItem/PostItem';
import { connect } from 'react-redux';

const PostList = ({ posts }) => {
  const renderPosts = posts => {
    if (posts.length === 0)
      return (
        <div className=" bg-white p-4 border border-light">
          No posts to show...
        </div>
      );
    return posts.map(post => {
      return <PostItem key={post._id} post={post} />;
    });
  };

  return <React.Fragment>{renderPosts(posts)}</React.Fragment>;
};
const mapStateToProps = state => {
  return {
    posts: state.profile.posts
  };
};

export default connect(mapStateToProps, null)(PostList);
