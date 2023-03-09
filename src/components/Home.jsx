import Month from '../components/Month';

function Home() {
  let data = {
    "month" : "March",
    "expenses" : [
      {
        date : "03/8/2023",
        records : [ 
          {
            id : 1,
            title : "Expense 1",
            price : "100",
            category : "Leisure",
          },          
          {
            id : 2,
            title : "Expense 2",
            price : "300",
            category : "School"
          }
        ]
      },
      {
        date : "03/10/2023",
        records : [ 
          {
            id : 3,
            title : "Expense 3",
            price : "100",
            category : "Health",
          }
        ]
      }
    ]
  }

  return (
    <Month month={data.month} expenses={data.expenses}/>
  );
}

export default Home