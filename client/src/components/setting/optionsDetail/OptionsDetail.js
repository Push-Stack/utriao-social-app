import React from 'react';

import './OptionsDetail.css';

import DeleteAccount from './deleteAccount/DeleteAccount';

import Personal from './personal/Personal';
import Hobbies from './hobbies/Hobbies';
import Education from './education/Education';
import ChangePassword from './changePassword/ChangePassword';
import ChangeEmail from './changeEmail/ChangeEmail';

const OptionsDetail = ({
  user,
  showComponents: {
    personal,
    hobbies,
    education,
    password,
    email,
    deleteAccount
  }
}) => {
  return (
    <React.Fragment>
      {personal && <Personal />}
      {hobbies && <Hobbies />}
      {education && <Education />}
      {password && <ChangePassword />}
      {email && <ChangeEmail />}

      {deleteAccount && <DeleteAccount />}
    </React.Fragment>
  );
};

export default OptionsDetail;
