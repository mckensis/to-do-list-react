import { useContext } from "react";
import ToDoListContext from "../context/ToDoListContext";

const TaskForm = () => {
  
  const {
    lists,
    getActiveList,
    handleHideTaskForm
  } = useContext(ToDoListContext);

  return (
    <form className="task" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="task-title">Task Name</label>
        <input type="text" id="task-title" name="task-title" minLength="1" maxLength="60" required autoComplete="off" autoFocus />
      <label htmlFor="task-due">Due</label>
        <input type="date" id="task-due" name="task-due" required />
      <label htmlFor="task-priority">Priority</label>
        <select defaultValue={1} name="task-priority" id="task-priority" required>
          <option value="2">Urgent</option>
          <option value="1">Default</option>
          <option value="0">Low</option>
        </select>
      <label htmlFor="task-list">List</label>
        <select defaultValue={getActiveList()} id="task-list" name="task-list" required>
        {lists.map(list => (
          <option key={list.id} value={list.id}>{list.title}</option>
        ))}
        </select>
      <button type="cancel" className="cancel" onClick={() => handleHideTaskForm()}>&#10007;</button>
      <button type="submit" className="confirm">&#10004;</button>
    </form>
  )
}

export default TaskForm;