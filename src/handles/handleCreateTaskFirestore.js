import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import Task from "../classes/Task";

const handleCreateTaskFirestore = async (data, userId, listId) => {
  const task = new Task({
    userId,
    listId,
    firestoreId: null,
    title: data.title,
    due: data.due,
    priority: data.priority,
    complete: false
  });

  // Don't save to firestore if it's the demo user
  if (userId === "demo-id") return task;
  
  try {
    const ref = collection(firestore, "tasks");
    const result = await addDoc(ref, {
      task_id: task.id,
      list_id: task.listId,
      user_id: task.userId,
      title: task.title,
      due: task.due,
      complete: task.complete,
      priority: task.priority,
    });
    task.firestoreId = result.id;
    return task;
  } catch (err) {
    console.log(err.message);
  }
}

export default handleCreateTaskFirestore;