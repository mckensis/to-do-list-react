import { createContext, useRef, useState } from "react";
import CreateDefaultList from '../functions/CreateDefaultList';
import { parseISO } from "date-fns";
import List from "../classes/List";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const sortTasks = (tasks) => {
    if (!tasks) return;

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
  };

  const handleFilterTasks = (id) => {
    const listsCopy = [...lists];
    const filteredList = listsCopy.filter(list => list.id === id);
    return filteredList[0];
  };

  const createDefaultTasks = () => {
    const allTasks = [];
    console.log(lists);
     lists.forEach(list => {
      list.tasks.forEach(task => {
        allTasks.push(task);
      });
    });
    return sortTasks(allTasks);
  };

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

  const handleSubmitListForm = (data, e) => {
    e.target.reset();
    handleHideListForm();
    handleAddNewList(data);
  }

  const handleSubmitTaskForm = (data, e) => {
    e.target.reset();
    handleHideTaskForm();
    handleAddNewTask(data);
  }

  const handleAddNewList = (data) => {
    const newList = new List({ title: data.title });
    newList.create({
      title: 'test',
      dueDate: '2023-07-07',
      priority: 1
    });
    const listsCopy = [...lists];
    setLists([...listsCopy, newList]);
  };

  const handleAddNewTask = (data) => {
    const listToUpdate = handleFilterTasks(data.list);
    listToUpdate.create({
      title: data.title,
      dueDate: data.due,
      priority: data.priority,
    });
    handleSetActiveList(data.list);
  };

  // Sets tasks based on the active list
  const handleSetActiveList = (id) => {
    if (!id) return;
    handleHideTaskForm();
    handleHideListForm();

    listRef.current.childNodes.forEach(child => {
      if (child.dataset.id !== id) child.classList.remove('active');  
      if (child.dataset.id === id) child.classList.add('active'); 
    });

    if (id !== 'all') {
      const activeList = handleFilterTasks(id);
      setTasks(sortTasks(activeList.tasks));
    }
    // Change this to display the actual tasks once we have those
    if (id === 'all') setTasks(createDefaultTasks());
  }

  const getActiveList = () => {
    if (!listRef || !listRef.current) return;
    const children = Array.from(listRef.current.children);
    let active = null;
    children.forEach(child => {
      if (child.classList.contains('active')) {
        active = child.dataset.id;
      }
    });
    return active;
  };

  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);

  const [lists, setLists] = useState(CreateDefaultList());
  const [tasks, setTasks] = useState(createDefaultTasks());
  const [user, setUser] = useState(null);

  const listRef = useRef();

  return (
    <ToDoListContext.Provider value={{
      user, setUser,
      lists, setLists, listRef,
      tasks, setTasks, sortTasks,
      createDefaultTasks, handleFilterTasks,
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleShowListForm, handleHideListForm,
      handleSubmitListForm, handleSubmitTaskForm,
      handleShowTaskForm, handleHideTaskForm,
      getActiveList, handleSetActiveList
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;