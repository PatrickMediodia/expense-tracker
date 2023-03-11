import Record from "./Record";

function Day(props) {
  return (
    <>
      <div className="day">
        <div className="day-header">{props.expenses.date.toLocaleString(0)}</div>
          <div className="records">
            { props.expenses.expenses.map(record => <Record key={record.id} record={record} />) }
          </div>
      </div>  
    </>
  );
}

export default Day