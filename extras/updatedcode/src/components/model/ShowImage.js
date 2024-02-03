import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/esm/Table';
import ImageModal from '../ImageModal';

const ShowImage = ({  message , images, setShowModal, showModal, onClose }) => {

//   const handleClose = () => setShowModal(false);

  return (
    <Modal centered size="lg" show={showModal} onHide={onClose} style={{minHeight:"80vh !important"}} className="showImage-modal">
      <Modal.Header closeButton>
      {/* <h6 className='pt-1'> : {scores ? scores.overall : "-"}</h6> */}
      </Modal.Header>
      <Modal.Body>
     <ImageModal 
     images={images}
     message={message}
     />
      </Modal.Body>
    </Modal>
  )
}

export default ShowImage