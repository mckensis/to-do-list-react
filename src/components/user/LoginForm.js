import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ToDoListContext from "../../context/ToDoListContext";

const LoginForm = () => {

  const {
    handleSignInWithGoogle,
    handleCreateUserThenSignInWithEmailAndPassword
  } = useContext(ToDoListContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (data, e) => {
    e.preventDefault();
    handleCreateUserThenSignInWithEmailAndPassword(email, password);
  }

  return (
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
    <section className="google">
      <p>Have a Google Account?</p>
      <button type="button" className="google" onClick={handleSignInWithGoogle}>Authorise via popup</button>
    </section>
    </>
  )
}

export default LoginForm;