import DeleteIcon from "../assets/deleteIcon.svg";

function ExpenseRecord(props) {
  return (
    <>
      <div className="record">
        <p>Title: {props.record.title}</p>
        <p>Price: {props.record.price}</p>
        <p>Category: {props.record.category}</p>
        <img src={DeleteIcon} className="delete-icon"/>
      </div>
    </>
  );
}

export default ExpenseRecord