import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import handleDeleteTaskFirestore from "./handleDeleteTaskFirestore";

export const handleDeleteListFirestore = async (list) => {

  // Get firestore ID of all tasks within the list that's being deleted
  const tasksToDelete = [...list.tasks.map(task => task.firestoreId)];
  
  try {
    // Delete the list
    const ref = doc(firestore, "lists", list.firestoreId);
    await deleteDoc(ref);

    // Also delete any tasks belonging to this list
    for (const task of tasksToDelete) {
      await handleDeleteTaskFirestore(task);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default handleDeleteListFirestore;