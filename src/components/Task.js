import { useContext, useState } from "react";
import ToDoListContext from "../context/ToDoListContext";

const Task = ({ task }) => {

  const {
    lists,
    setLists,
    activeList,
    handleDeleteTask,
    handleSetActiveList,
    handleSetActiveListToAllTasks,
  } = useContext(ToDoListContext);
  
  const [dueDateToggled, setDueDateToggled] = useState(false);

  const saveAndSetTasks = ({ foundList, listsCopy, taskToUpdate }) => {
    const tasksCopy = [ ...foundList['tasks'] ];
    const updatedTasks = tasksCopy.map(foundTask => foundTask.id === task.id ? foundTask = task : foundTask);
    foundList.tasks = updatedTasks;
    const updatedLists = listsCopy.map(list => list.id === foundList.id ? list = foundList : list);
    setLists(updatedLists);
  }

  const handleChangeTaskPriority = (taskToUpdate) => {
    
    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === taskToUpdate.list);
    
    if (!foundList) {
      console.log("Error finding the list to update a task priority in.");
      return;
    }
    
    task.updatePriority();
    saveAndSetTasks({ foundList, listsCopy, taskToUpdate });

  }
  
  const handleToggleDueDateFormat = () => {
    setDueDateToggled(!dueDateToggled);
  }

  const handleToggleTaskCompletion = (taskToUpdate) => {
    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === taskToUpdate.list);
    
    if (!foundList) {
      console.log("Error finding the list to update a task completion status in.");
      return;
    }
    
    task.toggleComplete();
    saveAndSetTasks({ foundList, listsCopy, taskToUpdate });
  }

  return (
    <li 
      className={task.isComplete() ? "task-item completed" : "task-item"}
      data-id={task.id}
      onMouseLeave={() => setDueDateToggled(false)}
    >
      <div>
        <input type="checkbox" checked={task.isComplete()} onChange={() => handleToggleTaskCompletion(task)} />
        <button className={`priority p${task.priority}`} onClick={() => handleChangeTaskPriority(task)}>
          {task.describePriorityInWords()}
        </button>
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