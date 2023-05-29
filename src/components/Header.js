import { useContext } from "react";
import ToDoListContext from '../context/ToDoListContext';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const { user, setUser } = useContext(ToDoListContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <header>
      <h1>Do the thing!</h1>
      <div className="user-section">
        <img src="" alt="" />
        {user && <>
          <p className="user-name">Signed in as <span>{user?.email}</span></p>
          <button className="user sign-out" onClick={handleSignOut}>Sign Out</button>
        </>}
      </div>
    </header>
  )
}

export default Header;