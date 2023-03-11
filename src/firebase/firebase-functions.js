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
  const recordsFromFirebase = data.docs.map((doc) => {
    const date = doc.data().date.toDate();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    return { 
      ...doc.data(), 
      id: doc.id ,
      date: `${month}/${day}/${year}`
    };
  });

  recordsFromFirebase.forEach((recordFromFirebase) => {
    //populate summary values
    if (recordFromFirebase.type === "Inflow") {
      homeValues.summary.inflow += recordFromFirebase.price;
      homeValues.summary.net += recordFromFirebase.price;
    } else if (recordFromFirebase.type === "Outflow") {
      homeValues.summary.outflow += recordFromFirebase.price;
      homeValues.summary.net -= recordFromFirebase.price;
    }

    //if in existing
    for(const newRecord of homeValues.newRecords) {
      if (recordFromFirebase.date == newRecord.date) {
        newRecord.expenses.push({
          id: recordFromFirebase.id,
          title: recordFromFirebase.title,
          price: recordFromFirebase.price,
          category: recordFromFirebase.category,
          type: recordFromFirebase.type
        });
        return;
      }
    }

    //if date is not yet existing
    homeValues.newRecords.push({
      date: recordFromFirebase.date,
      expenses: [
        {
          id: recordFromFirebase.id,
          title: recordFromFirebase.title,
          price: recordFromFirebase.price,
          category: recordFromFirebase.category,
          type: recordFromFirebase.type
        }
      ]
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