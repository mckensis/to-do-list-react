import { useContext } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import ToDoListContext from "../../context/ToDoListContext";

const TaskSection = () => {
  
  const {
    activeList,
    taskFormVisible, 
    handleShowTaskForm,
  } = useContext(ToDoListContext);

  return (
    <section className="task-section">
      <h2>Tasks</h2>
      {taskFormVisible && <TaskForm/>}

      {!taskFormVisible && 
        <button type="button" className="add task" onClick={() => handleShowTaskForm()}>+</button>
      }

      {!taskFormVisible && <ul className="task-container">
        {(activeList?.tasks?.length === 0 || !activeList) && <li className="empty-list" key="empty-list">No Tasks Found!</li>}

        {activeList?.tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>}
    </section>

  )
}

export default TaskSection;