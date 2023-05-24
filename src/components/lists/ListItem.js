import { useContext } from "react";
import ToDoListContext from "../../context/ToDoListContext";

const ListItem = ({ list }) => {

  const {
    activeList,
    handleDeleteList
  } = useContext(ToDoListContext);

  return (
    <li className="list-item" data-id={list.id}>
      {list.title}

      {/* Display a delete list button for the active list */}
      {activeList?.id === list.id &&
        <button className="delete list" onClick={() => handleDeleteList(list)}></button>
      }
    </li>
  )
}

export default ListItem;