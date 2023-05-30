import { useContext, useState } from "react";
import ToDoListContext from '../context/ToDoListContext';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, setUser, setLists, listSectionVisible, handleHideListSection } = useContext(ToDoListContext);
  const [expanded, setExpanded] = useState(false);

  const handleSignOut = async () => {
    setExpanded(false);
    try {
      await signOut(auth);
      setUser(null);
      setLists(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <header onMouseLeave={() => setExpanded(false)}>
      <section className="user-panel">
        {user && <button className="hide" onClick={() => handleHideListSection()}>{listSectionVisible ? 'Hide Lists' : 'Show Lists'}</button>}
        {user && <FaUserCircle className="user-icon" onClick={() => setExpanded(!expanded)} title={!expanded ? "Expand user panel" : "Hide user panel"} />}

        {expanded && user &&
          <section className="user-section">
            <p>Logged in as {user?.email}</p>
            <button className="user" onClick={() => handleSignOut()}>Logout</button>
          </section>
        }
      </section>
    </header>
  )
}

export default Header;