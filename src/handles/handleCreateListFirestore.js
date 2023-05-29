import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import List from "../classes/List";

export const handleCreateListFirestore = async (data, user) => {
  const list = new List({ title: data.title, user: user.id });
  
  // Don't save to firestore if it's the demo user
  if (user.id === "demo-id") return list;

  try {
    const ref = collection(firestore, "lists");
    const data = {
      list_id: list.id,
      user_id: list.userId,
      title: list.title
    };
    const response = await addDoc(ref, data);
    list.firestoreId = response.id;
    return list;
  } catch (err) {
    console.log(err.message);
  }
}

export default handleCreateListFirestore;