import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  where 
} from "firebase/firestore";
import { db } from '../firebase/firebase-config';

async function getExpenseRecords(month, year, days) {
  const recordsCollectionRef = collection(db, 'expenses');

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

  const newRecords = [];
  recordsFromFirebase.forEach((recordFromFirebase) => {
    //if in existing  
    newRecords.forEach((newRecord) => {
      if (recordFromFirebase.date == newRecord.date) {
        newRecord.expenses.push({
          id: recordFromFirebase.id,
          title: recordFromFirebase.title,
          category: recordFromFirebase.category
        });
        return;
      }   
    });

    //if date is not yet existing
    newRecords.push({
      date: recordFromFirebase.date,
      expenses: [
        {
          id: recordFromFirebase.id,
          title: recordFromFirebase.title,
          category: recordFromFirebase.category
        }
      ]
    });
  });

  return newRecords;
}

export default getExpenseRecords;