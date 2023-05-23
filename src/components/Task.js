import { useContext, useState } from "react";
import ToDoListContext from "../context/ToDoListContext";

const Task = ({ task }) => {

  const { handleDeleteTask } = useContext(ToDoListContext);
  const [dueDateToggled, setDueDateToggled] = useState(false);

  // TO:DO - Update to use lists state, not task state
  // const handleChangeTaskPriority = () => {
  //   task.updatePriority();
  //   const updatedTasks = [...tasks];
  //   updatedTasks.map((existingTask) => existingTask.id === task.id ? existingTask.priority = task.priority : existingTask);
  //   setTasks(updatedTasks);
  // }
  
  const handleToggleDueDateFormat = () => {
    setDueDateToggled(!dueDateToggled);
  }

  // TO:DO - Update to use lists state, not task state
  // const handleToggleTaskCompletion = () => {
  //   task.toggleComplete();
  //   const tasksCopy = [...tasks];
  //   tasksCopy.map((existingTask) => existingTask.id === task.id ? existingTask.complete = task.complete : existingTask);
  //   setTasks(tasksCopy);
  // }

  return (
    <li 
      className={task.isComplete() ? "task-item completed" : "task-item"}
      data-id={task.id}
      onMouseLeave={() => setDueDateToggled(false)}
    >
      <div>
        {/* Uncomment these once functions updated */}
        {/* <input type="checkbox" checked={task.isComplete()} onChange={() => handleToggleTaskCompletion()} />
        <button className={`priority p${task.priority}`} onClick={() => handleChangeTaskPriority()}>
          {task.describePriorityInWords()}
        </button> */}
        <p
          className={task.overdue ? 'due overdue' : 'due'}
          onClick={() => handleToggleDueDateFormat()}
        >
          {dueDateToggled ?
            `Due on ${task.describeDueDateExact()}`
            : `Due ${task.describeDueDateSimple()}`
          }
        </p>
      </div>
      <p>
        {task.title}
      </p>
      <button type="button" className="delete task" onClick={() => handleDeleteTask(task)}></button>
    </li>
  )
}

export default Task;