import Button from './Button';
import Modal from 'react-modal';
import React, { useState} from 'react'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function DeleteModal({ modalState, modalCloseFunction }) {
  return(
      <Modal
        isOpen={modalState}
        onRequestClose={modalCloseFunction}
        style={modalStyle}
        contentLabel="Delete Modal"
        >
        <h4>Do you want to delete this record?</h4>
        <div className="center-button">
          <Button 
            method={modalCloseFunction} 
            color={"#4CAF50"} 
            text={"Yes"}
          />
          <Button 
            method={modalCloseFunction} 
            color={"rgb(233, 116, 81"} 
            text={"No"}
          />
        </div>
      </Modal> 
  );
}

export default DeleteModal;