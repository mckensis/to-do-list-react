import { useContext } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import ToDoListContext from "../context/ToDoListContext";

const Lists = () => {

  const {
    lists,
    listRef,
    setTasks,
    createDefaultTasks,
    listFormVisible,
    handleFilterTasks,
    handleHideListForm,
    handleShowListForm,
    handleHideTaskForm
  } = useContext(ToDoListContext);

  const handleSetActiveList = (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    handleHideTaskForm();
    handleHideListForm();

    listRef.current.childNodes.forEach(child => {
      child.classList.remove('active');
    });
    e.target.classList.add('active');
  
    if (id !== 'all') handleFilterTasks(id);
    // Change this to be display the actual tasks once we have those
    if (id === 'all') setTasks(createDefaultTasks());
  }

  return (
    <aside className="list-section">
      <h2>Lists</h2>

      {listFormVisible && <ListForm />}

      {!listFormVisible && 
        <button type="button" className="add list" onClick={() => handleShowListForm()}>+</button>}
      
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