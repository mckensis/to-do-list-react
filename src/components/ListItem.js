import { useContext } from "react";
import ToDoListContext from "../context/ToDoListContext";

const ListItem = ({ list }) => {

  const { 
    getActiveList 
  } = useContext(ToDoListContext);

  return (
    <li className="list-item" data-id={list.id}>
      {list.title}
      {getActiveList() === list.id && 
        <button className="delete list"></button>
      }
    </li>
  )
}

export default ListItem;