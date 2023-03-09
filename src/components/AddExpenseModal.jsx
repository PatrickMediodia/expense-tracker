import React from 'react'
import Button from './Button';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import CloseIcon from "../assets/closeIcon.svg";
import 'react-datepicker/dist/react-datepicker.css';

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

//list of categories
const categories = [
  "Please select a category.",
  "Leisure",
  "School",
  "Personal"
];

function AddExpenseModal({ modalState, modalCloseFunction }) {
  //date picker initial date
  const [startDate, setStartDate] = React.useState(new Date());

  return (
    <>
      <Modal
        isOpen={modalState}
        onRequestClose={modalCloseFunction}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <div class="modal">
          <div className='modal-header'>
            <h2>Add Expense</h2>
            <img src={CloseIcon} className="close-icon" onClick={modalCloseFunction}/>
          </div>
          <hr/>
          <form className="add-expense-form">
            <label class="form-title">Title:</label>
            <input className="input-field" name="title" id="title"/>
            <label class="form-title">Price:</label>
            <input className="input-field" name="price" id="price"/>
            <label class="form-title">Date:</label>
            <DatePicker 
              className="input-field" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
            />
            <label class="form-title">Category:</label>
            <select className="dropdown" name="category-dropdown">
              { categories.map(category => <option value={category}>{category}</option>) }
            </select>
          </form>
          <div className="center-button">
            <Button method={modalCloseFunction} text="Add Expense" color="#4CAF50" />
          </div>
        </div>
      </Modal> 
    </>
  );
}

export default AddExpenseModal;