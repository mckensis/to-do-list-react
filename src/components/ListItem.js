import { useContext } from "react";
import ToDoListContext from "../context/ToDoListContext";

const ListItem = ({ list }) => {

  const {
    lists,
    setLists,
    getActiveList,
    handleSetActiveList,
  } = useContext(ToDoListContext);

  const handleListDeletion = () => {
    let listsCopy = [...lists];
    let newLists = listsCopy.filter(existingList => existingList.id !== list.id);
    setLists(newLists);
    handleSetActiveList('all');
  }
  
  return (
    <li className="list-item" data-id={list.id}>
      {list.title}
      {getActiveList() === list.id && 
        <button className="delete list" onClick={handleListDeletion}></button>
      }
    </li>
  )
}

export default ListItem;