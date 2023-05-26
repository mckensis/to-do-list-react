import { collection, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import List from "../classes/List";

export const handleRetrieveLists = async (id) => {
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