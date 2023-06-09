import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ToDoListContext from "../../context/ToDoListContext";

const LoginForm = () => {

  const {
    handleSignInWithGoogle,
    handleSignInDemo,
    handleCreateUserThenSignInWithEmailAndPassword
  } = useContext(ToDoListContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const signIn = (data, e) => {
    e.preventDefault();
    handleCreateUserThenSignInWithEmailAndPassword(email, password);
  }

  return (
    <>
    {!formVisible && <>
    <section className="option">
      <h3>Login with email or Google Account</h3>
      <span>You can login instantly with one click using either your Google Account or any email & password. No registration is required.</span>
      <button type="button" className="option" onClick={() => setFormVisible(true)}>Go to login page</button>
    </section>

    <section className="option">
      <h3>Just having a look?</h3>
      <span>You can use the button below to test the website. All functionality is enabled, however reloading the page will reset any changes you make.</span>
      <button type="button" className="option" onClick={handleSignInDemo}>Login instantly as temporary user</button>
    </section>
    </>}
    
    {formVisible && 
      <>
      <form onSubmit={handleSubmit(signIn)}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            autoComplete="off"
            autoFocus
            { ...register('email', { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, onChange: (e) => setEmail(e.target.value)})}
            />
          {errors?.email?.type === "required" && <p role="alert">Please enter your email address.</p>}
          {errors?.email?.type === "pattern" && <p role="alert">Please enter a valid email address i.e. example@example.com</p>}
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            { ...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, onChange: (e) => setPassword(e.target.value)})}
            />
          {errors?.password?.type === "required" && <p role="alert">Please enter your password.</p>}
          {errors?.password?.type === "minLength" && <p role="alert">Password must be at least 6 characters.</p>}
          {errors?.password?.type === "pattern" && <p role="alert">Password must include one or more uppercase letters, lowercase letters, and digits.</p>}
        </label>

        <button type="submit">Create Account & Login</button>
      </form>

      <section className="option">
        <h3>Have a Google Account?</h3>
        <span>You can use this button to login quickly & securely with your Google account and begin creating your own tasks & lists.</span>
        <button type="button" className="option" onClick={handleSignInWithGoogle}>Authorise via Google popup</button>
      </section>

      <button type="button" className="cancel" onClick={() => setFormVisible(false)}>Back to login options</button>
      </>
    }
    </>
  )
}

export default LoginForm;