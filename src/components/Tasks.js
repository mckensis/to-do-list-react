import { useContext } from "react";
import Task from "./Task";
import ToDoListContext from "../context/ToDoListContext";

const Tasks = () => {
  
  const {
    tasks,
    taskFormVisible, 
    handleShowTaskForm,
    handleHideTaskForm
  } = useContext(ToDoListContext);

  return (
    <main className="task-section">
      <h2>Tasks</h2>
      {taskFormVisible && 
        <form className="add-task">
          <label htmlFor="task-title">Task Name</label>
            <input className="add-task title" type="text" id="task-title" name="task-title" minLength="1" maxLength="60" required autoComplete="off" />
          <label htmlFor="task-due">Due</label>
            <input className="add-task due" name="task-due" type="date" required />
          <label htmlFor="task-priority">Priority</label>
            <select defaultValue={1} className="add-task priority" name="task-priority" id="task-priority" required>
              <option value="2">Urgent</option>
              <option value="1">Default</option>
              <option value="0">Low</option>
            </select>
          <label htmlFor="task-list">List</label>
            <select className="add-task list" id="task-list" name="task-list" required>
            </select>
          <button type="cancel" name="task-cancel" className="add-task cancel" onClick={() => handleHideTaskForm()}>&#935;</button>
          <button type="submit" name="task-submit" className="add-task confirm">&#10003;</button>
        </form>
      }

      {!taskFormVisible && 
        <button className="add-new task" onClick={() => handleShowTaskForm()}>+</button>
      }

      {!taskFormVisible && <ul className="task-container">
        {tasks.length === 0 && <li className="empty-list" key="empty-task-list">No Tasks Found!</li>} 
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>}
    </main>

  )
}

export default Tasks;