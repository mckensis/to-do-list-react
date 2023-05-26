import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import List from "../classes/List";

// Test firestore connection
export const handleSubmit = (testdata) => {
  const ref = collection(firestore, "test_data");
  
  let data = {
    testData: testdata
  };

  try {
    addDoc(ref, data)
  } catch (err) {
    console.log(err);
  }
}

const handleRetrieveLists = async (id) => {
  const lists = [];
  try {
    const ref = collection(firestore, "lists");
    const response = await getDocs(ref, where("user_id", "==", id));
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    data.forEach(returnedList => {
      const list = new List({ title: returnedList.title, id: returnedList.list_id, user: returnedList.user_id, firestore: returnedList.id })
      lists.push(list);
    });
    return lists;
  } catch (err) {
    console.log(err.message);
  }
}

const handleRetrieveTasks = async (id) => {
  try {
    const ref = collection(firestore, "tasks");
    const response = await getDocs(ref, where("user_id", "==", id));
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export const handleRetrieveData = async (id) => {
  const lists = await handleRetrieveLists(id);
  const tasks = await handleRetrieveTasks(id);

  lists.forEach(list => {
    tasks.forEach(task => {
      if (task.list_id === list.id) {
        list.create({
          id: task.task_id,
          list: task.list_id,
          user: task.user_id,
          firestore: task.id,
          title: task.title,
          priority: task.priority,
          due: task.due,
          complete: task.complete
        })
      }
    })
  })
  return lists;
}