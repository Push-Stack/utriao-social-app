import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Hobbies = ({ hobbies, userId, authUser }) => {
  const renderHobbiesDiv = (name, value) => {
    return (
      <div className="col col-lg-6 col-md-6 col-sm-12 col-12  ">
        <h6 className="text-black   text-capitalize ">{name}:</h6>
        <p className="small text-info">{value}</p>
      </div>
    );
  };

  const checkHobbiesValues = () => {
    const hobbyObject = { ...hobbies, _id: '', createdAt: '', updatedAt: '' };
    const data = Object.values(hobbyObject);
    const isEmpty = data.every(hobby => {
      return hobby === '';
    });

    return isEmpty;
  };

  return (
    <React.Fragment>
      <div className="hobbies unique-color-dark  mt-4 p-4 rounded text-white ">
        <h6 className="  font-weight-bold mdb-color darken-3  text-light p-4">
          Hobbies and Interests{' '}
          {userId === authUser && (
            <Link to="/setting">
              <i className="fa fa-sliders ml-2 float-right text-white"></i>
            </Link>
          )}
        </h6>
        {checkHobbiesValues() && (
          <div className="p-4 mt-3">
            <p className=" text-white">No data is entered from user side...</p>
          </div>
        )}
        {!hobbies && (
          <div className="p-4 mt-3">
            {userId === authUser && (
              <p className=" text-white">
                Please add something you are interested in...
              </p>
            )}

            {userId === authUser && (
              <Link to="/setting" className="text-info  ">
                Click on to navigate to settings
              </Link>
            )}
          </div>
        )}

        <div className="row    p-4 ">
          {hobbies &&
            hobbies.hobbies &&
            renderHobbiesDiv('Hobbies', hobbies.hobbies)}

          {hobbies &&
            hobbies.favouriteTvShows &&
            renderHobbiesDiv('Favourite Tv Shows', hobbies.favouriteTvShows)}

          {hobbies &&
            hobbies.favouriteMovies &&
            renderHobbiesDiv('Favourite Movies', hobbies.favouriteMovies)}

          {hobbies &&
            hobbies.favouriteGames &&
            renderHobbiesDiv('Favourite Games', hobbies.favouriteGames)}

          {hobbies &&
            hobbies.favouriteMusic &&
            renderHobbiesDiv(
              'Favourite Music Bands / Artists',
              hobbies.favouriteMusic
            )}

          {hobbies &&
            hobbies.favouriteBooks &&
            renderHobbiesDiv('Favourite Books', hobbies.favouriteBooks)}

          {hobbies &&
            hobbies.favouriteWriters &&
            renderHobbiesDiv('Favourite Writers', hobbies.favouriteWriters)}

          {hobbies &&
            hobbies.otherInterests &&
            renderHobbiesDiv('Other Interests', hobbies.otherInterests)}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    hobbies: state.profile.user.hobbies,
    userId: state.profile.user._id,
    authUser: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, null)(Hobbies);
