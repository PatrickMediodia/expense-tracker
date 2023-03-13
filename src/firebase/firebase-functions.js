import { 
  collection, 
  deleteDoc, 
  doc, 
  addDoc,
  updateDoc
} from "firebase/firestore";
import { db } from '../firebase/firebase-config';

const recordsCollectionRef = collection(db, 'expenses');

function getExpenseRecords(querySnapshot) {
  const homeValues = {
    newRecords: [],
    summary: {
      inflow: 0,
      outflow: 0,
      net: 0
    }
  }

  let currentDate = null;
  querySnapshot.forEach((doc) => {
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
      id: doc.id,
      title: expense.title,
      price: expense.price,
      category: expense.category,
      type: expense.type,
      date: date
    }

    // create new date object
    if (currentDate === null) {
      currentDate = {
        date: dateString,
        expenses: [ expenseObject ]
      }
    }

    // if same as current date 
    else if (currentDate.date === dateString) {
      currentDate.expenses.push(expenseObject);
    }

    //if different from current date
    else {
      homeValues.newRecords.push(currentDate);
      currentDate = {
        date: dateString,
        expenses: [ expenseObject ]
      }
    }
  });

  //append last date
  currentDate != null 
    ? homeValues.newRecords.push(currentDate) 
    : null;
    
  return homeValues;
}

async function addExpenseRecord(id, expenseObject) {
  await addDoc(recordsCollectionRef, expenseObject);
} 

async function updateExpenseRecord(id, expenseObject) {
  const expenseDoc = doc(db, 'expenses', id);
  await updateDoc(expenseDoc, expenseObject);
}

async function deleteExpenseRecord(id) {
  const expenseDoc = doc(db, "expenses", id);
  await deleteDoc(expenseDoc);
}

export {
  getExpenseRecords,
  deleteExpenseRecord,
  addExpenseRecord,
  updateExpenseRecord
};