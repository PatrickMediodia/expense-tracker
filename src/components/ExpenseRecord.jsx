function ExpenseRecord(props) {
  return (
    <>
      <div className="record">
        <p>Title: {props.record.title}</p>
        <p>Price: {props.record.price}</p>
        <p>Category: {props.record.category}</p>
      </div>
    </>
  );
}

export default ExpenseRecord