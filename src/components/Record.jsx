import React, { useState} from 'react'
import DeleteModal from "./DeleteModal";
import ExpenseModal from './ExpenseModal';
import EditIcon from "../assets/editIcon.svg";
import DeleteIcon from "../assets/deleteIcon.svg";

function ExpenseRecord(props) {
  //user ID in this record
  const [userID, setUserID] = useState(props.record.id);

  const [deleteIsOpen, setDelete] = useState(false);
  function openModalDelete() { setDelete(true); }
  function closeModalDelete() { setDelete(false); }

  const [editIsOpen, setEdit] = useState(false);
  function openModalEdit() { setEdit(true); }
  function closeModalEdit() { setEdit(false); }
  
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
            nClick={openModalEdit}
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
      />

      <DeleteModal
        modalState={deleteIsOpen} 
        modalCloseFunction={closeModalDelete}
        userID={userID}
      />
    </>
  );
}

export default ExpenseRecord