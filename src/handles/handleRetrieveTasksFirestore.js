import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const handleRetrieveTasksFirestore = async (id) => {
  try {
    const ref = collection(firestore, "tasks");
    const taskQuery = query(ref, where("user_id", "==", id));
    const response = await getDocs(taskQuery);
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}