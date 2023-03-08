import DeleteIcon from "../assets/deleteIcon.svg";
import Modal from 'react-modal';
import React from 'react';
import Button from './Button';

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

function ExpenseRecord(props) {
  //modal state
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="record">
        <p>Title: {props.record.title}</p>
        <p>Price: {props.record.price}</p>
        <p>Category: {props.record.category}</p>
        <img src={DeleteIcon} className="delete-icon" onClick={openModal}/>
      </div>

      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Example Modal"
        >
        <h4>Do you want to delete this record?</h4>
        <div className="center-button">
          <Button method={closeModal} color={"#4CAF50"} text={"Yes"}/>
          <Button method={closeModal} color={"rgb(233, 116, 81"} text={"No"}/>
        </div>
      </Modal> 
    </>
  );
}

export default ExpenseRecord