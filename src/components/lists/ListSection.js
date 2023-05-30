import { useContext, useRef } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import ToDoListContext from "../../context/ToDoListContext";

const ListSection = () => {
  const {
    lists,
    listRef,
    listSectionVisible,
    listFormVisible,
    handleShowListForm,
    handleSetActiveList,
  } = useContext(ToDoListContext);

  const asideRef = useRef();

  return (
    <>
{listSectionVisible &&    <aside className="list-section" ref={asideRef}>
      <h2>Lists</h2>

      {listFormVisible && <ListForm />}

      {!listFormVisible && 
        <button type="button" className="add list" onClick={() => handleShowListForm()}>+</button>}
      
      <ul ref={listRef} className="list-container" onClick={(e) => handleSetActiveList(e.target.dataset.id)}>
        <li className="list-item" data-id="all">All Tasks</li>  
        {lists?.map(list => (
          <ListItem key={list.id} list={list} />
          ))}
      </ul>
    </aside>}
          </>
  )
}

export default ListSection;