import { useContext } from "react";
import ListItem from "./ListItem";
import ToDoListContext from "../context/ToDoListContext";
import List from "../classes/List";

const Lists = () => {

  const {
    lists,
    listRef,
    setLists,
    setTasks,
    createDefaultTasks,
    listFormVisible,
    handleFilterTasks,
    handleHideListForm,
    handleShowListForm,
    handleHideTaskForm
  } = useContext(ToDoListContext);

  const handleSubmitListForm = (e) => {
    e.preventDefault();
    handleAddNewList(e.target['list-title'].value);
    e.target.reset();
    handleHideListForm();
  }

  const handleAddNewList = (title) => {
    const newList = new List({ title });
    const listsCopy = [...lists];
    setLists([...listsCopy, newList]);
  } 

  const handleSetActiveList = (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    handleHideTaskForm();
    handleHideListForm();

    listRef.current.childNodes.forEach(child => {
      child.classList.remove('active');
    })
    e.target.classList.add('active');
  
    // Change this to be display the actual tasks once we have those
    if (id !== 'all') handleFilterTasks(id);
    if (id === 'all') setTasks(createDefaultTasks());
  }

  return (
    <aside className="list-section">
      <h2>Lists</h2>

      {listFormVisible && 
        <form className="add-list" onSubmit={(e) => handleSubmitListForm(e)}>
          <label htmlFor="list-title">List Title</label>
          <input
            autoFocus
            type="text" 
            id="list-title" 
            name="list-title" 
            className="add-list"
            minLength="1" 
            maxLength="15" 
            pattern="^[a-zA-Z0-9 ]+" 
            autoComplete="off"
            required
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
      
      <ul ref={listRef} className="list-container" onClick={(e) => handleSetActiveList(e)}>
        <li className="list-item active all-tasks-list" data-id="all">All Tasks</li>
        
        {lists.map(list => (
          <ListItem key={list.id} list={list} />
        ))}
        
      </ul>
      <button className="expand">Hide</button>
    </aside>
  )
}

export default Lists;