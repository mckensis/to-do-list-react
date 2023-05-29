import { useContext } from "react";
import { useForm } from "react-hook-form";
import ToDoListContext from "../../context/ToDoListContext";
import add from "date-fns/add";

const TaskForm = () => {
  
  const {
    lists,
    activeList,
    handleHideTaskForm,
    handleSubmitTaskForm
  } = useContext(ToDoListContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className="task" onSubmit={handleSubmit(handleSubmitTaskForm)}>
      
      <label htmlFor="task-title">Task Name
        <input
          type="text"
          id="task-title"
          name="task-title"
          autoComplete="off"
          className={errors.title ? "unacceptable" : "acceptable"}
          autoFocus
          { ...register('title', { required: true, maxLength: 60, pattern: /^[a-zA-Z0-9-_'".,!?£$%&*#() ]+/ }) }
          />
        {errors?.title?.type === "required" && <p role="alert">This field is required.</p>}
        {errors?.title?.type === "maxLength" && <p role="alert">The maximum length of the task is 60 characters.</p>}
        {errors?.title?.type === "pattern" && <p role="alert">Some special characters are not allowed.</p>}
      </label>
      
      <label htmlFor="task-due">Due
        <input
          type="date"
          id="task-due"
          name="task-due"
          defaultValue={new Date().toISOString().split("T")[0]}
          { ...register('due', { required: true, min: new Date().toISOString().split("T")[0], max: add(new Date(), { years: 100, }).toISOString().split('T')[0] }) }
          />
        {errors?.due?.type === "required" && <p role="alert">This field is required.</p>}
        {errors?.due?.type === "min" && <p role="alert">The task due date cannot be before today.</p>}
        {errors?.due?.type === "max" && <p role="alert">The task due date cannot be more than 100 years from today.</p>}
      </label>

      <label htmlFor="task-priority">Priority
        <select
          id="task-priority"
          name="task-priority"
          defaultValue={1}
          { ...register('priority', { required: true }) }
          >
          <option value="2">Urgent</option>
          <option value="1">Default</option>
          <option value="0">Low</option>
        </select>
        {errors?.priority?.type === "required" && <p role="alert">This field is required.</p>}
      </label>
    
      <label htmlFor="task-list">List
        <select
          disabled={(!lists || lists.length === 0)}
          id="task-list"
          name="task-list"
          defaultValue={activeList?.id}
          { ...register('list', { required: true }) }
        >
          {lists?.map(list => (
            <option key={list.id} value={list.id}>{list.title}</option>
            ))}

          {/* Displays if there are no lists to add the task to */}
          {(!lists || lists.length === 0) && 
            <option value="" selected disabled>No Lists</option> 
          }
        </select>
        {errors?.list?.type === "required" && <p role="alert">This field is required.</p>}
      </label>
    
      <button type="button" className="cancel" onClick={() => handleHideTaskForm()}>&#10007;</button>
      <button type="submit" className="confirm" disabled={(!lists || lists.length === 0)} title={(!lists || lists.length === 0) ? 'Please create a list before adding a task.' : null}>&#10004;</button>
    </form>
  )
}

export default TaskForm;