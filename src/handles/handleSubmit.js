import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Test firestore connection
const handleSubmit = (testdata) => {
  const ref = collection(firestore, "test_data");
  
  let data = {
    testData: testdata
  };

  try {
    addDoc(ref, data)
  } catch (err) {
    console.log(err);
  }
}

export default handleSubmit;