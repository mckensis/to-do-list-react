import { useContext } from "react";
import ToDoListContext from "../context/ToDoListContext";

const ListForm = () => {
  
  const {
    handleHideListForm,
    handleSubmitListForm 
  } = useContext(ToDoListContext);
  
  return (
    <form
      className="list"
      onSubmit={(e) => handleSubmitListForm(e)}
    >
      <label htmlFor="list-title">List Title</label>
      <input
        autoFocus
        type="text"
        id="list-title" 
        name="list-title"
        minLength="1"
        maxLength="15"
        pattern="^[a-zA-Z0-9 ]+"
        autoComplete="off"
        required
      />
      <button 
        type="button" 
        className="cancel"
        onClick={() => handleHideListForm()}
      >
        &#10007;
      </button>
      <button 
        type="submit"
        className="confirm"
      >
        &#10004;
      </button>
    </form>
  )
}

export default ListForm;