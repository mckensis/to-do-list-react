import { createContext, useState } from "react";
import CreateDefaultList from '../functions/CreateDefaultList';
import { compareAsc, format, parseISO } from "date-fns";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const createDefaultTasks = () => {
    const allTasks = [];
     lists.forEach(list => {
      list.tasks.forEach(task => {
        return allTasks.push(task);
      });
    });
    return allTasks;
  }

  const checkIfTaskOverdue = (task) => {
    //Finds out if the task is overdue and not completed to style accordingly
    if (compareAsc(parseISO(format(new Date(), 'yyyy-MM-dd')), parseISO(task.dueDate)) === 1 && !task.complete) {
      return true;
    }
  }

  const handleShowListForm = () => {
    handleHideTaskForm();
    setListFormVisible(true);
  };

  const handleShowTaskForm = () => {
    handleHideListForm();
    setTaskFormVisible(true);
  };

  const handleHideListForm = () => {
    setListFormVisible(false);
  };

  const handleHideTaskForm = () => {
    setTaskFormVisible(false);
  };

  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);
  const [lists, setLists] = useState(CreateDefaultList());
  const [tasks, setTasks] = useState(createDefaultTasks());
  const activeList = null;

  return (
    <ToDoListContext.Provider value={{
      lists, setLists, activeList,
      tasks, setTasks, checkIfTaskOverdue,
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleShowListForm, handleHideListForm,
      handleShowTaskForm, handleHideTaskForm,
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;