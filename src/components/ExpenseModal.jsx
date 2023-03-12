import React, { useEffect, useState } from 'react'
import Button from './Button';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import CloseIcon from "../assets/closeIcon.svg";
import 'react-datepicker/dist/react-datepicker.css';

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
  "Leisure",
  "School",
  "Personal"
];

//list of types
const types = [
  "Inflow",
  "Outflow"
];

function ExpenseModal({
  title,
  modalState,
  modalCloseFunction,
  formState,
  postFunction,
  id,
  message
}) {
  const [formData, setFormData] = useState(() => formState);
  useEffect(() => {
    setFormData(formState);
  }, [formState]);

  const functionToExecute = async () => {
    await postFunction(id, formData);
  };
  
  const handleInputChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={modalCloseFunction}
      style={modalStyle}
      contentLabel="Example Modal"
      appElement={document.getElementById('root')}
    >
      <div className="modal">
        <div className='modal-header'>
          <h2>{title}</h2>
          <img
            src={CloseIcon}
            className="close-icon"
            onClick={modalCloseFunction}
          />
        </div>
        <hr />

        <form className="expense-form">
          <label class="form-title">Title:</label>
          <input
            className="input-field"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <label className="form-title">Price:</label>
          <input
            className="input-field"
            name="price"
            id="price"
            type="number"
            value={formData.price}
            onChange={(event) => {
              setFormData(prevData => ({
                ...prevData,
                price: parseFloat(event.target.value)
              }));
            }}
            required
          />
          <label className="form-title">Date:</label>
          <DatePicker
            name="date"
            className="input-field"
            selected={formData.date}
            onChange={(date) => {
              setFormData(prevData => ({
                ...prevData,
                date: date
              }));
            }}
            required
          />
          <label className="form-title">Category:</label>
          <select
            className="dropdown"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Please select a category.</option>
            {categories.map(category => <option value={category}>{category}</option>)}
          </select>
          <label className="form-title">Type:</label>
          <select
            className="dropdown"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Please select a type.</option>
            {types.map(type => <option value={type}>{type}</option>)}
          </select>
          <div className="center-button">
            <Button
              method={() => {
                functionToExecute();
                modalCloseFunction();
                alert(message);
              }}
              text={title}
              color="#4CAF50"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ExpenseModal;