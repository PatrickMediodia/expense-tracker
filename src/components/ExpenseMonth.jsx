import React from 'react';
import ExpenseDay from "./ExpenseDay";
import AddIcon from "../assets/addIcon.svg";
import AddExpenseModal from "../components/AddExpenseModal";

function ExpenseMonth({ month, expenses }) {
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
        <AddExpenseModal modalState={modalIsOpen} modalCloseFunction={closeModal}/>

        {/* Month body*/}
        <div className="month-body">
          { expenses.map(expenseObject => (<ExpenseDay key={expenseObject.id} expense={expenseObject} /> )) }
        </div>

      </div>
    </>
  );
}

export default ExpenseMonth