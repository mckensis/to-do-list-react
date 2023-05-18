const Header = () => {
  return (
    <header>
      <h1>Do the thing!</h1>
      <div className="user-section">
        <img src="" alt="" />
        <p className="user-name" hidden>Signed in as <span></span>
        </p>
        <button className="user sign-in">Sign In</button>
        <button className="user sign-out" hidden>Sign Out</button>
      </div>
    </header>
  )
}

export default Header;