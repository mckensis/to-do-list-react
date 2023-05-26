import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const handleCreateListFirestore = async (list, user) => {
  const ref = collection(firestore, "lists");
  const data = {
    list_id: list.id,
    user_id: user.id,
    title: list.title
  };
  await addDoc(ref, data);
}

export default handleCreateListFirestore;