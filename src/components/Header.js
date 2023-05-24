import { useContext } from "react";
import ToDoListContext from '../context/ToDoListContext';

const Header = () => {
  const { user, setUser } = useContext(ToDoListContext);

  const handleSignIn = () => {
    console.log("clicked");
  }

  return (
    <header>
      <h1>Do the thing!</h1>
      <div className="user-section">
        <img src="" alt="" />
        {user && <>
          <p className="user-name">Signed in as <span>{user?.name}</span></p>
          <button className="user sign-out">Sign Out</button>
        </>}

        {!user && <button className="user sign-in" onClick={() => handleSignIn()}>Sign In</button>}
      </div>
    </header>
  )
}

export default Header;