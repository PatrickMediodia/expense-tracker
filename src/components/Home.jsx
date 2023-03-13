import Day from "./Day";
import Summary from './Summary';
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.svg";
import LeftArrow from "../assets/leftArrow.svg";
import RightArrow from "../assets/rightArrow.svg";
import React, { useState, useEffect }from 'react';
import { getExpenseRecords, addExpenseRecord } from "../firebase/firebase-functions";
import { onSnapshot, collection, query, where, orderBy, doc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function Home() {
  const currentDate = new Date();
  const [monthYear, setMonthYear] = useState({ 
    month: currentDate.getMonth(), 
    year: currentDate.getFullYear() 
  });
  
  const decrementDate = () => {
    setMonthYear((prevState) => {
      let newState = { ...prevState }

      if(prevState.month == 1) {
        newState.month = 12;
        newState.year = prevState.year - 1;
      } else {
        newState.month = prevState.month - 1;
      }

      return newState;
    });
  }

  const incrementDate = () => {
    setMonthYear((prevState) => {
      let newState = { ...prevState }

      if(prevState.month == 12) {
        newState.month = 1;
        newState.year = prevState.year + 1;
      } else {
        newState.month = prevState.month + 1;
      }

      return newState;
    });
  }

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

    const recordsCollectionRef = collection(db, 'expenses');

    const q = query(
      recordsCollectionRef,
      where("date", ">=", new Date(year, month, '00')),
      where("date", "<", new Date(year, month, days)),
      orderBy("date", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const homeValues = getExpenseRecords(querySnapshot)
      setRecords(homeValues.newRecords);
      setSummary(homeValues.summary);     
    });

  }, [monthYear]);
  
  // modal state
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() { setIsOpen(true); }
  function closeModal() { 
    setIsOpen(false); 
    setFormState(defaultFormState); 
  }
  
  const defaultFormState = {
    title: null,
    price: null,
    date: new Date(),
    category: null,
    type: null
  };

  const [formState, setFormState] = useState(defaultFormState);

  return (
    <>
      <div className="month">
        
        {/* Month header*/ }
        <div className="month-header">
          <h1 className="month-text">
            <img 
              src={LeftArrow} 
              className="arrow-icon"
              onClick={decrementDate}
            />
            {`${monthNames[monthYear.month]} ${monthYear.year}`}
            <img 
              src={RightArrow} 
              className="arrow-icon"
              onClick={incrementDate}
            />
          </h1>
          <button 
            className="add-expense-button" 
            onClick={openModal}
          >
            <img
              src={AddIcon} 
              className="add-icon"
            />
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
          postFunction={addExpenseRecord}
          formState={formState}
          message={"Expense Added"}
        />

        {/* Month body*/}
        <div className="month-body">
          { 
            records.length != 0 
              ? records.map((record) => (<Day expenses={record} />)) 
              : <div style={{ textAlign: "center", marginTop: "100px"}}>
                  <h2>No records to show</h2>
                </div>
          }
        </div>
      </div>
    </>
  );
}

export default Home