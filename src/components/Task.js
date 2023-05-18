import { useContext, useState } from "react";
import ToDoListContext from "../context/ToDoListContext";

const Task = ({ task }) => {

  const { tasks, setTasks } = useContext(ToDoListContext);
  
  const [dueDateToggled, setDueDateToggled] = useState(false);

  const handleChangeTaskPriority = () => {
    task.changePriority();
    const updatedTasks = [...tasks];
    updatedTasks.map((existingTask) => existingTask.id === task.id ? existingTask.priority = task.priority : existingTask);
    setTasks(updatedTasks);
  }
  
  const handleToggleDueDateFormat = () => {
    setDueDateToggled(!dueDateToggled);
  }

  const handleToggleTaskCompletion = () => {
    task.toggleComplete();
    const tasksCopy = [...tasks];
    tasksCopy.map((existingTask) => existingTask.id === task.id ? existingTask.complete = task.complete : existingTask);
    setTasks(tasksCopy);
  }

  const handleTaskDeletion = () => {
    let tasksCopy = [...tasks];
    let newTasks = tasksCopy.filter(existingTask => existingTask.id !== task.id);
    setTasks(newTasks);
  }

  return (
    <li 
      className={task.isComplete() ? "task-item completed" : "task-item"}
      data-id={task.id}
      onMouseLeave={() => setDueDateToggled(false)}
    >
      <div>
        <input type="checkbox" checked={task.isComplete()} onChange={() => handleToggleTaskCompletion()} />
        <button className={`task-priority p${task.priority}`} onClick={() => handleChangeTaskPriority()}>
          {task.priorityInWords()}
        </button>
        <p 
          className={task.isOverdue() ? 'due overdue' : 'due'}
          onClick={() => handleToggleDueDateFormat()}
        >
          {dueDateToggled ?
            `Due on ${task.dueDateExact()}`
            : `Due ${task.dueDateInWords()}`
          }</p>
      </div>
      <p>
        {task.title}
      </p>
      <button type="button" className="task-delete" onClick={() => handleTaskDeletion()}></button>
    </li>
  )
}

export default Task;