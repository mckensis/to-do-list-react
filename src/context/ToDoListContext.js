import { createContext, useRef, useState } from "react";
import CreateDefaultList from '../functions/CreateDefaultList';
import { parseISO } from "date-fns";
import List from "../classes/List";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const sortTasks = (tasks) => {
    let temp = [...tasks];
    let complete = [];
    let incomplete = [];

    temp.forEach(task => {
        if (task.isComplete()) {
            complete.push(task);
        } else {
            incomplete.push(task);
        }
    });

    //Sort the complete tasks to have most recent at the top
    let sortedComplete = complete.sort((taskOne, taskTwo) => {
        return parseISO(taskTwo.dueDate) - parseISO(taskOne.dueDate) || taskTwo.priority - taskOne.priority;
    });

    //Sort the incomplete tasks to have nearest due date at the top
    let sortedIncomplete = incomplete.sort((taskOne, taskTwo) => {
        return taskOne.complete - taskTwo.complete || parseISO(taskOne.dueDate) - parseISO(taskTwo.dueDate) || taskTwo.priority - taskOne.priority;
    });

    let sortedTasks = [...sortedIncomplete, ...sortedComplete];
    return sortedTasks;
  }

  const handleFilterTasks = (id) => {
    const listsCopy = [...lists];
    const filteredList = listsCopy.filter(list => list.id === id);
    setTasks(filteredList[0].tasks);
  }

  const createDefaultTasks = () => {
    const allTasks = [];
     lists.forEach(list => {
      list.tasks.forEach(task => {
        allTasks.push(task);
      });
    });
    return sortTasks(allTasks);
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

  const handleSubmitListForm = (e) => {
    e.preventDefault();
    handleAddNewList(e.target['list-title'].value);
    e.target.reset();
    handleHideListForm();
  }

  const handleAddNewList = (title) => {
    const newList = new List({ title });
    const listsCopy = [...lists];
    setLists([...listsCopy, newList]);
  }


  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);
  const [lists, setLists] = useState(CreateDefaultList());
  const [tasks, setTasks] = useState(createDefaultTasks());

  const listRef = useRef();

  return (
    <ToDoListContext.Provider value={{
      lists, setLists, listRef,
      tasks, setTasks, sortTasks,
      createDefaultTasks, handleFilterTasks,
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleShowListForm, handleHideListForm,
      handleSubmitListForm,
      handleShowTaskForm, handleHideTaskForm,
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;