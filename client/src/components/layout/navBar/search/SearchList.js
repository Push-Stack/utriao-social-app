import React from 'react';
import SearchItem from './SearchItem';
import { connect } from 'react-redux';

const SearchList = ({ usersList, count }) => {
  if (!usersList) return <div> </div>;

  return (
    <ul className="list-group  mt-4">
      {count > 0 && renderCounts(count)}
      {renderSearchList(usersList, count)}
    </ul>
  );
};

const renderCounts = count => {
  return (
    <p className="lead text-light font-weight-bold">Search Result : {count}</p>
  );
};

const renderSearchList = (data, count) => {
  if (data.length === 0) return renderCounts(count);

  return data.map(user => {
    return <SearchItem key={user._id} userItem={user} />;
  });
};

const mapStateToProps = state => {
  return {
    usersList: state.profile.searchResult.users,
    count: state.profile.searchResult.count
  };
};

export default connect(mapStateToProps, null)(SearchList);
