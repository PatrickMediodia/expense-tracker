import React, { useState} from 'react'
import DeleteModal from "./DeleteModal";
import ExpenseModal from './ExpenseModal';
import EditIcon from "../assets/editIcon.svg";
import DeleteIcon from "../assets/deleteIcon.svg";

function ExpenseRecord(props) {
  //modal state
  const [deleteIsOpen, setDelete] = useState(false);

  function openModalDelete() { 
    setDelete(true); 
  }

  function closeModalDelete() { 
    setDelete(false); 
  }

  //modal state
  const [editIsOpen, setEdit] = useState(false);

  function openModalEdit() { 
    setEdit(true); 
  }

  function closeModalEdit() { 
    setEdit(false); 
  }

  return (
    <>
      <div className="record">
        <p>Title: {props.record.title}</p>
        <p>Price: {props.record.price}</p>
        <p>Category: {props.record.category}</p>        
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
      />

      <DeleteModal
        modalState={deleteIsOpen} 
        modalCloseFunction={closeModalDelete}
      />
    </>
  );
}

export default ExpenseRecord