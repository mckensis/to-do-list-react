import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const handleDeleteListFirestore = async (list, user) => {
  const ref = doc(firestore, "lists", list.firestoreId);
  await deleteDoc(ref);
}

export default handleDeleteListFirestore;