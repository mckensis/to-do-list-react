import { useContext } from "react";
import ToDoListContext from "../context/ToDoListContext";

const Lists = () => {

  const {
    listFormVisible,
    handleHideListForm,
    handleShowListForm
  } = useContext(ToDoListContext);

  return (
    <aside className="list-section">
      <h2>Lists</h2>

      {listFormVisible && 
        <form className="add-list" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="list-name">List Title</label>
          <input 
            name="list-name" 
            id="list-name" 
            className="add-list"
            type="text" 
            minLength="1" 
            maxLength="15" 
            pattern="^[a-zA-Z0-9 ]+" 
            required
            autoComplete="off"
          />
          <button 
            type="button" 
            name="list-cancel" 
            className="add-list cancel"
            onClick={() => handleHideListForm()}
          >&#935;</button>
          <button 
            type="submit" 
            name="submit" 
            className="add-list confirm"
          >&#10003;</button>
      </form>}

      {!listFormVisible && <button className="add-new list" onClick={() => handleShowListForm()}>+</button>}
      
      <ul className="list-container">
        <li className="list-item active all-tasks-list" data-id="all">All Tasks</li>
      </ul>
      <button className="expand">Hide</button>
    </aside>
  )
}

export default Lists;