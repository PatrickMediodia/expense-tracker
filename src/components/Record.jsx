import React, { useState} from 'react'
import DeleteModal from "./DeleteModal";
import ExpenseModal from './ExpenseModal';
import EditIcon from "../assets/editIcon.svg";
import DeleteIcon from "../assets/deleteIcon.svg";
import { updateExpenseRecord } from '../firebase/firebase-functions';

function ExpenseRecord(props) {
  //user ID in this record
  const [expenseID, setExpenseID] = useState(props.record.id);

  const defaultFormState = {
    title: props.record.title,
    price: props.record.price,
    date: props.record.date,
    category: props.record.category,
    type: props.record.type
  };
  
  const [formState, setFormState] = useState(defaultFormState);

  const [deleteIsOpen, setDelete] = useState(false);
  function openModalDelete() { setDelete(true); }
  function closeModalDelete() { setDelete(false); }

  const [editIsOpen, setEdit] = useState(false);
  function openModalEdit() { setEdit(true); }
  function closeModalEdit() { 
    setEdit(false); 
    setFormState(defaultFormState);
  }
  
  return (
    <>
      <div className="record">
        <p>
          <b>Type:&nbsp;</b> 
          {props.record.type}
        </p>
        <p>
          <b>Title:&nbsp;</b> 
          {props.record.title}
        </p>
        <p>
          <b>Price:&nbsp;</b> 
          {props.record.price}
        </p>
        <p>
          <b>Category:&nbsp;</b> 
          {props.record.category}
        </p> 
        <img 
          src={EditIcon} 
          className="edit-icon" 
          onClick={openModalEdit}
          />
        <img 
          src={DeleteIcon} 
          className="delete-icon" 
          onClick={openModalDelete}
        />   
      </div>
      
      <ExpenseModal 
        title="Edit Expense" 
        modalState={editIsOpen} 
        modalCloseFunction={closeModalEdit}
        postFunction={updateExpenseRecord}
        formState={formState}
        id={props.record.id}
      />

      <DeleteModal
        modalState={deleteIsOpen} 
        modalCloseFunction={closeModalDelete}
        expenseID={expenseID}
      />
    </>
  );
}

export default ExpenseRecord