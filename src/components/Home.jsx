import Day from "./Day";
import Summary from './Summary';
import Record from './Record';
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.svg";
import { db } from '../firebase/firebase-config';
import React, { useState, useEffect }from 'react';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

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

  //get records
  const [records, setRecords] = useState([]);
  const recordsCollectionRef = collection(db, 'expenses');

  useEffect(() => {
    const month = monthYear.month;
    const year = monthYear.year;
    const days = daysInMonth(month, year);

    const getRecords = async() => {
      const q = query(
        recordsCollectionRef,
        where("date", ">=", new Date(`${year}, ${month}, 00`)),
        where("date", "<", new Date(`${year}, ${month}, ${days}`)),
        orderBy("date", "desc")
      );
      
      const data = await getDocs(q);
      const recordsFromFirebase = data.docs.map((doc) => {
        const date = doc.data().date.toDate();
        return { 
          ...doc.data(), 
          id: doc.id ,
          date: `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
        };
      });

      const newRecords = [];
      recordsFromFirebase.forEach((recordFromFirebase) => {
        for(const newRecord of newRecords) {
          console.log(newRecord.date);
          if (recordFromFirebase.date == newRecord.date) {
            newRecord.expenses.push({
              id: recordFromFirebase.id,
              title: recordFromFirebase.title,
              category: recordFromFirebase.category
            });
            return;
          }
        }

        newRecords.push({
          date: recordFromFirebase.date,
          expenses: [
            {
              id: recordFromFirebase.id,
              title: recordFromFirebase.title,
              category: recordFromFirebase.category
            }
          ]
        });
      });

      setRecords(newRecords);
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

        <Summary 
          inflow={1000}
          outflow={50}
          net={100}
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