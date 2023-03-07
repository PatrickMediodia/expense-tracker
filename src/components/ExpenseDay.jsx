import ExpenseRecord from "./ExpenseRecord";

function ExpenseDay(props) {
  return (
    <>
      <div className="day">
        <div className="day-header">{props.expense.date}</div>
          <div className="records">
            { props.expense.records.map(record => <ExpenseRecord key={record.id} record={record} />) }
          </div>
      </div>  
    </>
  );
}

export default ExpenseDay