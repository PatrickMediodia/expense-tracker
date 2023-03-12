import { 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  orderBy, 
  query, 
  where,
  onSnapshot,
  addDoc
} from "firebase/firestore";
import { db } from '../firebase/firebase-config';

const recordsCollectionRef = collection(db, 'expenses');

async function getExpenseRecords(month, year, days) {
  const homeValues = {
    newRecords: [],
    summary: {
      inflow: 0,
      outflow: 0,
      net: 0
    }
  }

  const q = query(
    recordsCollectionRef,
    where("date", ">=", new Date(`${year}, ${month}, 00`)),
    where("date", "<", new Date(`${year}, ${month}, ${days}`)),
    orderBy("date", "desc")
  );
  
  const data = await getDocs(q);
  data.docs.forEach((doc) => {
    const expense = doc.data();
    
    //populate summary values
    if (expense.type === "Inflow") {
      homeValues.summary.inflow += expense.price;
      homeValues.summary.net += expense.price;
    } else if (expense.type === "Outflow") {
      homeValues.summary.outflow += expense.price;
      homeValues.summary.net -= expense.price;
    }
  
    const date = expense.date.toDate();
    const dateString = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

    const expenseObject = {
      id: expense.id,
      title: expense.title,
      price: expense.price,
      category: expense.category,
      type: expense.type
    }
    
    //if in existing
    for(const newRecord of homeValues.newRecords) {
      if (dateString == newRecord.date) {
        newRecord.expenses.push(expenseObject);
        return;
      }
    }

    //if date is not yet existing
    homeValues.newRecords.push({
      date: dateString,
      expenses: [ expenseObject ]
    });
  });

  return homeValues;
}

async function addExpenseRecord(expenseObject) {
  await addDoc(recordsCollectionRef, expenseObject);
}

async function deleteExpenseRecord(id) {
  const expenseDoc = doc(db, "expenses", id);
  await deleteDoc(expenseDoc);
}

export {
  getExpenseRecords,
  deleteExpenseRecord,
  addExpenseRecord
};