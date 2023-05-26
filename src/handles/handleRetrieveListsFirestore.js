import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import List from "../classes/List";

export const handleRetrieveListsFirestore = async (id) => {
  const lists = [];
  try {
    const ref = collection(firestore, "lists");
    const listQuery = query(ref, where("user_id", "==", id));
    const response = await getDocs(listQuery);
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    data.forEach(returnedList => {
      const list = new List({ title: returnedList.title, id: returnedList.list_id, user: returnedList.user_id, firestore: returnedList.id })
      lists.push(list);
    });
    return lists;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}