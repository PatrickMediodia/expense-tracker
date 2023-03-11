import React, { useState } from 'react'
import Button from './Button';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import CloseIcon from "../assets/closeIcon.svg";
import 'react-datepicker/dist/react-datepicker.css';
import { addExpenseRecord } from '../firebase/firebase-functions';

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

//list of types
const types = [
  "Please select a type.",
  "Inflow",
  "Outflow"
];

function ExpenseModal({ title, modalState, modalCloseFunction }) {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    date: new Date(),
    category: "",
    type: ""
  });

  const addExpense = async() => {
    await addExpenseRecord(formData);
  };

  return (
      <Modal
        isOpen={modalState}
        onRequestClose={modalCloseFunction}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <div class="modal">
          <div className='modal-header'>
            <h2>{title}</h2>
            <img 
              src={CloseIcon} 
              className="close-icon" 
              onClick={modalCloseFunction}
            />
          </div>
          <hr/>

          <form className="expense-form">
            <label class="form-title">Title:</label>
            <input 
              className="input-field" 
              name="title" 
              id="title"
              onChange={(event) => {
                setFormData(prevData => ({
                  ...prevData,
                  title: event.target.value
                }));
              }}
            />
            <label class="form-title">Price:</label>
            <input 
              className="input-field" 
              name="price" 
              id="price"
              onChange={(event) => {
                setFormData(prevData => ({
                  ...prevData,
                  price: parseFloat(event.target.value)
                }));
              }}
            />
            <label class="form-title">Date:</label>
            <DatePicker 
              className="input-field" 
              selected={formData.date} 
              onChange={(date) => {
                setFormData(prevData => ({
                  ...prevData,
                  date: date
                }));
              }}
            />
            <label class="form-title">Category:</label>
            <select 
              className="dropdown" 
              name="category-dropdown"
              onChange={(event) => {
                setFormData(prevData => ({
                  ...prevData,
                  category: event.target.value
                }));
              }}
            >
              { categories.map(category => <option value={category}>{category}</option>) }
            </select>
            <label class="form-title">Type:</label>
            <select 
              className="dropdown" 
              name="category-dropdown"
              onChange={(event) => {
                setFormData(prevData => ({
                  ...prevData,
                  type: event.target.value
                }));
              }}
            >
              { types.map(type => <option value={type}>{type}</option>) }
            </select>
          </form>
          <div className="center-button">
            <Button 
              method={()=> {
                addExpense();
                modalCloseFunction();
                alert('Expense added')
              }}
              text="Add Expense" 
              color="#4CAF50"
            />
          </div>
        </div>
      </Modal> 
  );
}

export default ExpenseModal;