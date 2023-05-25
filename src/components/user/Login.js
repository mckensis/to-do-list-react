import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import ToDoListContext from "../../context/ToDoListContext";
import LoginForm from "./LoginForm";

const Login = () => {
    
  const { handleSetUser } = useContext(ToDoListContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleSetUser(user);
      }
      setLoading(false);
    });
  }, [handleSetUser]);

  return (
    <>
    {!loading && 
      <section className="user login">
        <h2>Login</h2>
        <LoginForm />
      </section>
    }

    {loading &&
      <section className="loading">
        <p>Loading</p>
      </section>
    }
    </>
  )
}

export default Login;