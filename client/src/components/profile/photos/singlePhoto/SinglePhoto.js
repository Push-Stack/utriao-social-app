import React, { useState } from 'react';
import Modal from 'react-modal';

import './SinglePhoto.css';

const SinglePhoto = ({ post }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50vh',

      margin: '0 auto',
      boxShadow: '10px 10px 5px 9px rgba(0,0,0,0.75)'
    }
  };

  return (
    <React.Fragment>
      {post && post.imagePath && (
        <div className="col-lg-2 col-md-4 col-sm-6 col-12 p-2  singlePhoto">
          <img
            onClick={() => setShowImageModal(true)}
            className="img-fluid img-thumbnail  "
            src={post.imagePath}
            alt=""
          />
          <Modal
            style={customStyles}
            onRequestClose={() => setShowImageModal(false)}
            isOpen={showImageModal}
          >
            <img
              style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
              src={post.imagePath}
              alt=""
              className="img-fluid img-thumbnail rounded "
            />
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
};

export default SinglePhoto;
