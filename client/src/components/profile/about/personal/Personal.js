import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import moment from 'moment';
const Personal = ({ user, authUser }) => {
  const listItem = (name, value) => {
    if (name === 'Birthday') value = moment(value).format('Do MMMM YYYY');

    return (
      <li className="list-group-item border-0  unique-color-dark text-white">
        <div className="d-flex justify-content-start ">
          <div className="  small text-white text-capitalize align-self-center">
            {name}:
          </div>
          <div className=" ml-4 small overflow-hidden align-self-center text-info ">
            {value}
          </div>
        </div>
      </li>
    );
  };

  return (
    <React.Fragment>
      <div className="card my-4 rounded  ">
        <div className="card-header font-weight-bold mdb-color darken-3  text-white pb-2  ">
          <i className="fa fa-user mr-1"></i> Personal Info
          {user._id === authUser && (
            <Link to="/setting">
              <i className="fa fa-sliders ml-2 float-right text-white"></i>
            </Link>
          )}
        </div>
        <div className="pt-3 unique-color-dark  "></div>
        <ul className="list-group widget list-group-flush">
          {!user.gender && (
            <li className="list-group-item  unique-color-dark text-white">
              No information to show here...
            </li>
          )}

          {user.description && listItem('About', user.description)}

          {user.gender && listItem('Gender', user.gender)}
          {user.status && listItem('Status', user.status)}

          {user.birthday && listItem('Birthday', user.birthday)}
          {user.country && listItem('Country', user.country)}
          {user.state && listItem('Province', user.state)}
          {user.city && listItem('City', user.city)}
          {user.birthplace && listItem('Birthplace', user.birthplace)}

          {user.occupation && listItem('Occupation', user.occupation)}
          {user.phone && listItem('Phone', user.phone)}
          {user.religion && listItem('Religious Beliefs', user.religion)}
          {user.website && listItem('Website', user.website)}

          {user.politicalIncline &&
            listItem('Political Interest', user.politicalIncline)}
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.profile.user,
    authUser: state.auth.currentUser.id
  };
};

export default connect(mapStateToProps, null)(Personal);
