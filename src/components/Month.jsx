import Day from "./Day";
import React from 'react';
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.svg";

function ExpenseMonth({ month, expenses }) {
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
          <h1 className="month-text">{month}</h1>
          <button 
            className="add-expense-button" 
            onClick={openModal}
          >
          <img src={AddIcon} className="add-icon"/>
          <p className="add-text">Add Expense</p>
          </button>
        </div>

        {/* Add expense modal form */}
        <ExpenseModal 
          title="Add Expense" 
          modalState={modalIsOpen} 
          modalCloseFunction={closeModal}
        />

        {/* Month body*/}
        <div className="month-body">
        { 
          expenses.map(expenseObject => (
            <Day key={expenseObject.id} expense={expenseObject} /> 
          )) 
        }
        </div>

      </div>
    </>
  );
}

export default ExpenseMonth