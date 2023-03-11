import Day from "./Day";
import Summary from './Summary';
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.svg";
import React, { useState, useEffect }from 'react';
import { getExpenseRecords } from "../firebase/firebase-functions";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function Home() {
  //month and year state
  const [monthYear, setMonthYear] = useState({ 
    month: 3, 
    year: 2023 
  });

  const [summary, setSummary] = useState({
    inflow: 0,
    outflow: 0,
    net: 0
  });

  //records state
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const month = monthYear.month;
    const year = monthYear.year;
    const days = daysInMonth(month, year);

    const getRecords = async() => {
      const homeValues = await getExpenseRecords(month, year, days)
      setRecords(homeValues.newRecords);
      setSummary(homeValues.summary);
    };

    getRecords();
  }, [monthYear]);

  // modal state
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  return (
    <>
      <div className="month">
        {/* Month header*/ }
        <div className="month-header">
          <h1 className="month-text">
            {monthNames[monthYear.month-1]}
          </h1>
          <button 
            className="add-expense-button" 
            onClick={openModal}
          >
          <img src={AddIcon} className="add-icon"/>
          <p className="add-text">Add Expense</p>
          </button>
        </div>

        {/* Summary of expenses for the month */}
        <Summary 
          inflow={summary.inflow}
          outflow={summary.outflow}
          net={summary.net}
        />

        {/* Add expense modal form */}
        <ExpenseModal 
          title="Add Expense" 
          modalState={modalIsOpen} 
          modalCloseFunction={closeModal}
        />

        {/* Month body*/}
        <div className="month-body">
          { records.map((record) => (<Day expenses={record} />)) }
        </div>
      </div>
    </>
  );
}

export default Home