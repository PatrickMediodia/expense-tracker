import Record from "./Record";

function ExpenseDay(props) {
  return (
    <>
      <div className="day">
        <div className="day-header">{props.expense.date}</div>
          <div className="records">
            { props.expense.records.map(record => <Record key={record.id} record={record} />) }
          </div>
      </div>  
    </>
  );
}

export default ExpenseDay