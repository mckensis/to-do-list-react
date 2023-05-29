import { doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { updateDoc } from "firebase/firestore";

const handleUpdateTaskFirestore = async (task) => {
  
  // Do not update firestore if it's the demo user
  if (task.userId === "demo-id") return;
  
  try {
    const ref = doc(firestore, "tasks", task.firestoreId);
    await updateDoc(ref, {
      title: task.title,
      due: task.due,
      priority: task.priority,
      complete: task.complete,
      list_id: task.listId
    });
  } catch (err) {
    console.log(err.message);
  }
}

export default handleUpdateTaskFirestore;