import { useContext, useState } from "react";
import ToDoListContext from "../../context/ToDoListContext";

const TaskItem = ({ task }) => {

  const {
    lists,
    setLists,
    handleDeleteTask,
  } = useContext(ToDoListContext);
  
  const [dueDateToggled, setDueDateToggled] = useState(false);

  const saveAndSetTasks = ({ foundList, listsCopy, taskToUpdate }) => {
    const tasksCopy = [ ...foundList['tasks'] ];
    const updatedTasks = tasksCopy.map(foundTask => foundTask.id === taskToUpdate.id ? foundTask = taskToUpdate : foundTask);
    foundList.tasks = updatedTasks;
    const updatedLists = listsCopy.map(list => list.id === foundList.id ? list = foundList : list);
    setLists(updatedLists);
  }

  const handleChangeTaskPriority = (taskToUpdate) => {
    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === taskToUpdate.listId);
    
    if (!foundList) {
      console.log("Error finding the list to update a task priority in.");
      return;
    }
    
    taskToUpdate.updatePriority();
    saveAndSetTasks({ foundList, listsCopy, taskToUpdate });
  }
  
  const handleToggleTaskCompletion = (taskToUpdate) => {
    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === taskToUpdate.listId);
    
    if (!foundList) {
      console.log("Error finding the list to update a task completion status in.");
      return;
    }
    
    taskToUpdate.toggleComplete();
    saveAndSetTasks({ foundList, listsCopy, taskToUpdate });
  }

  const handleToggleDueDateFormat = (task) => {
    if (task.isComplete()) return;
    setDueDateToggled(!dueDateToggled);
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
          className={task.overdue && !task.isComplete() ? 'due overdue' : 'due'}
          onClick={() => handleToggleDueDateFormat(task)}
        >

          {!task.isComplete() ?
            dueDateToggled ?
              `Due on ${task.describeDueDateExact()}`
              : `Due ${task.describeDueDateSimple()}`
              : task.describeDueDateExact()
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

export default TaskItem;