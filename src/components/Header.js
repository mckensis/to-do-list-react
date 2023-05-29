import { useContext, useState } from "react";
import ToDoListContext from '../context/ToDoListContext';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, setUser } = useContext(ToDoListContext);
  const [expanded, setExpanded] = useState(false);

  const handleSignOut = async () => {
    setExpanded(false);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <header onMouseLeave={() => setExpanded(false)}>
      <div className="user-panel">

      {user && <FaUserCircle className="user-icon" onClick={() => setExpanded(!expanded)} title={!expanded ? "Expand user panel" : "Hide user panel"} />}

      {expanded && user &&
        <div className="user-section">
          <p>Logged in as {user?.email}</p>
          <button className="user" onClick={() => handleSignOut()}>Logout</button>
        </div>
      }
      </div>
    </header>
  )
}

export default Header;