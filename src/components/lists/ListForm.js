import { useContext } from "react";
import { useForm } from "react-hook-form";
import ToDoListContext from "../../context/ToDoListContext";

const ListForm = () => {
  
  const {
    handleHideListForm,
    handleSubmitListForm,
  } = useContext(ToDoListContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      className="list"
      onSubmit={handleSubmit(handleSubmitListForm)}
    >
      <label htmlFor="list-title">List Title
        <input
          autoFocus
          type="text"
          id="list-title" 
          name="list-title"
          autoComplete="off"
          { ...register('title', { required: true, maxLength: 15, pattern: /^[a-zA-Z0-9 ]+/ })}
        />
        {errors?.title?.type === "required" && <p role="alert">Required field.</p>}
        {errors?.title?.type === "pattern" && <p role="alert">Alphanumeric characters only.</p>}
        {errors?.title?.type === "maxLength" && <p role="alert">15 characters maximum.</p>}
      </label>
      <button type="button" className="cancel" onClick={() => handleHideListForm()}>&#10007;</button>
      <button type="submit" className="confirm">&#10004;</button>
    </form>
  )
}

export default ListForm;