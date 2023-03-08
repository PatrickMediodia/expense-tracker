import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ExpenseDay from "./ExpenseDay";
import AddIcon from "../assets/addIcon.svg";

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
  const [startDate, setStartDate] = useState(new Date());

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

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <h2>Add Expense</h2>
          <hr/>
          <form className="add-expense-form">
            Title:
            <input className="input-field" name="title" id="title"/>
            Price:
            <input className="input-field" name="price" id="price"/>
            Date:
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            Category:
            <select className="dropdown" name="category-dropdown">
              {
                categories.map(category => {
                  return <option value={category}>{category}</option>
                })
              }
            </select>
          </form>
          <button className="close-button" onClick={closeModal}>
            <p className="add-text">Close</p>
          </button>
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