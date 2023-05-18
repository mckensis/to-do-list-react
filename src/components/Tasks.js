import { useContext } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import ToDoListContext from "../context/ToDoListContext";

const Tasks = () => {
  
  const {
    tasks,
    taskFormVisible, 
    handleShowTaskForm,
  } = useContext(ToDoListContext);

  return (
    <main className="task-section">
      <h2>Tasks</h2>
      {taskFormVisible && <TaskForm/>}

      {!taskFormVisible && 
        <button className="add-new task" onClick={() => handleShowTaskForm()}>+</button>
      }

      {!taskFormVisible && <ul className="task-container">
        {tasks?.length === 0 && <li className="empty-list" key="empty-task-list">No Tasks Found!</li>} 
        {tasks?.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>}
    </main>

  )
}

export default Tasks;