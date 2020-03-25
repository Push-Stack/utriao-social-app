import React, { useState } from 'react';
import Modal from 'react-modal';
const PhotoItem = ({ post }) => {
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
      boxShadow: '10px 10px 29px 9px rgba(0,0,0,0.75',
      background: '#2E2E2E'
    }
  };

  return (
    <div>
      {post.imagePath ? (
        <img
          onClick={() => setShowImageModal(true)}
          style={{ width: '100px', height: '100px', cursor: 'pointer' }}
          src={post.imagePath}
          alt=""
          className="img-fluid img-thumbnail rounded"
        />
      ) : null}

      <Modal
        style={customStyles}
        onRequestClose={() => setShowImageModal(false)}
        isOpen={showImageModal}
      >
        <img
          onClick={() => setShowImageModal(true)}
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          src={post.imagePath}
          alt=""
          className="img-fluid img-thumbnail rounded "
        />
      </Modal>
    </div>
  );
};

export default PhotoItem;
