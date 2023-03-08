import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ExpenseDay from "./ExpenseDay";
import AddIcon from "../assets/addIcon.svg";
import CloseIcon from "../assets/closeIcon.svg";
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

function ExpenseMonth({ month, expenses }) {
  //date picker initial date
  const [startDate, setStartDate] = React.useState(new Date());

  //list of categories
  let categories = [
    "Please select a category.",
    "Leisure",
    "School",
    "Personal"
  ];

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
      <div className="month">
        
        {/* Month header*/}
        <div className="month-header">
          <h2 className="month-text">{month}</h2>
          <button className="add-expense-button" onClick={openModal}>
            <img src={AddIcon} className="add-icon"/>
            <p className="add-text">Add Expense</p>
          </button>
        </div>

        {/* Add expense modal form */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <div class="modal">
            <div className='modal-header'>
              <h2>Add Expense</h2>
              <img src={CloseIcon} className="close-icon" onClick={closeModal}/>
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
                {
                  categories.map(category => {
                    return <option value={category}>{category}</option>
                  })
                }
              </select>
            </form>
            <div className="center-button">
              <Button method={closeModal} text="Add Expense" color="#4CAF50" />
            </div>
          </div>
        </Modal> 
        
        {/* Month body*/}
        <div className="month-body">
          { 
            expenses.map(expenseObject => {
              return <ExpenseDay key={expenseObject.id} expense={expenseObject} />
            }) 
          }
        </div>

      </div>
    </>
  );
}

export default ExpenseMonth