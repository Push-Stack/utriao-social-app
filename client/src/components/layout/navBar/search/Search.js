import React, { useState } from 'react';
import Modal from 'react-modal';
import SearchList from './SearchList';
import { connect } from 'react-redux';
import {
  searchUsers,
  setSearchModalHide
} from '../../../../store/actions/profileActions';

import './Search.css';
const Search = ({
  searchUsers,

  setSearchModalHide,
  isOpen
}) => {
  const [showModal, setShowModal] = useState(isOpen ? true : false);
  const [searchInput, setSearchInput] = useState({ name: '' });

  const onChangeHandler = event => {
    setSearchInput({ name: event.target.value });
  };

  const onSubmithandler = event => {
    event.preventDefault();
    searchUsers(searchInput);
    setSearchInput({ name: '' });
  };
  const customStyles = {
    content: {
      marginTop: '60px',
      background: '#3E4551',
      boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75) ',
      borderRadius: '10px 10px 10px 10px'
    }
  };

  return (
    <React.Fragment>
      <Modal
        style={customStyles}
        isOpen={showModal}
        onRequestClose={() => {
          setSearchModalHide();
          setShowModal(false);
        }}
      >
        <div className="container h-20 mb-4">
          <div className="d-flex justify-content-center h-100">
            <form onSubmit={onSubmithandler.bind(this)}>
              <div className="searchbar">
                <input
                  onChange={onChangeHandler.bind(this)}
                  value={searchInput.name}
                  name="name"
                  className="search_input"
                  type="text"
                  placeholder="Search..."
                />
                <button type="submit" className="search_icon">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <SearchList />
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isOpen: state.profile.searchModalShow
  };
};

export default connect(mapStateToProps, {
  searchUsers,

  setSearchModalHide
})(Search);
