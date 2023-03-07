import ExpenseDay from "./ExpenseDay";

function ExpenseMonth({ month, expenses }) {
  return (
    <>
      <div className="month">

        {/* Month header*/}
        <div className="month-header">
          <h2 className="month-text">{month}</h2>
          <button className="add-expense">Add Expense</button>
        </div>

        {/* Month body*/}
        <div className="month-body">
          { 
            expenses.map(expenseObject => {
              return <ExpenseDay key={expenseObject.id} expense={expenseObject} />
            }) 
          }
        </div>

      </div>
    </>
  );
}

export default ExpenseMonth