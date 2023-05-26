import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const handleDeleteTaskFirestore = async (id) => {
  try {
    const ref = doc(firestore, "tasks", id);
    await deleteDoc(ref);
  } catch (err) {
    console.log(err.message);
  }
}

export default handleDeleteTaskFirestore;