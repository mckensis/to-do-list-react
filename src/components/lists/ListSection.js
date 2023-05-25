import { useContext } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import ToDoListContext from "../../context/ToDoListContext";

const ListSection = () => {
  const {
    lists,
    listRef,
    listFormVisible,
    handleShowListForm,
    handleSetActiveList,
  } = useContext(ToDoListContext);

  return (
    <aside className="list-section">
      <h2>Lists</h2>

      {listFormVisible && <ListForm />}

      {!listFormVisible && 
        <button type="button" className="add list" onClick={() => handleShowListForm()}>+</button>}
      
      <ul ref={listRef} className="list-container" onClick={(e) => handleSetActiveList(e.target.dataset.id)}>
        <li className="list-item active" data-id="all">All Tasks</li>  
        {lists?.map(list => (
          <ListItem key={list.id} list={list} />
        ))}
      </ul>
      
      <button type="button" className="expand">Hide</button>
    </aside>
  )
}

export default ListSection;