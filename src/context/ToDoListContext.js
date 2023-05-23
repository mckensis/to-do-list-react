import { createContext, useEffect, useRef, useState } from "react";
import CreateDefaultList from '../functions/CreateDefaultList';
import { parseISO } from "date-fns";
import List from "../classes/List";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);

  const [lists, setLists] = useState(CreateDefaultList());
  const [activeList, setActiveList] = useState(null);
  const [user, setUser] = useState(null);

  const listRef = useRef();

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
  };

  const handleSubmitTaskForm = (data, e) => {
    e.target.reset();
    handleHideTaskForm();
    handleAddNewTask(data);
  };

  const handleAddNewList = (data) => {
    const newList = new List({ title: data.title });
    newList.create({
      title: 'test',
      due: '2023-07-07',
      priority: 1,
      list: newList.id
    });
    const listsCopy = [...lists];
    setLists([...listsCopy, newList]);
  };

  const handleAddNewTask = (data) => {
    const listCopy = lists.find(list => list.id === data.list);
    if (!listCopy) {
      console.log("Error finding the list to add a new task to.")
      return;
    }

    listCopy.create({
      title: data.title,
      due: data.due,
      priority: data.priority,
      list: data.list
    });

    setActiveList(sortTasks(listCopy));
  };

  const handleDeleteTask = (task) => {
    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === task.list);

    if (!foundList) {
      console.log("Error finding the list to delete a task from.");
      return;
    }

    const tasksCopy = [ ...foundList['tasks'] ];
    const updatedTasks = tasksCopy.filter(foundTask => foundTask.id !== task.id);
    foundList.tasks = updatedTasks;

    const updatedLists = listsCopy.map(list => list.id === foundList.id ? list = foundList : list);

    setLists(updatedLists);

    if (!activeList.id) {
      handleSetActiveListToAllTasks();
      return;
    } 

    handleSetActiveList(activeList.id);
  };

  const handleDeleteList = (list) => {

    const listsCopy = [...lists];
    const updatedLists = listsCopy.filter(foundList => foundList.id !== list.id);

    if (!updatedLists) {
      console.log("Error finding the list to delete a task from.");
      return;
    }

    setActiveList(null);
    setLists(updatedLists);
    // handleSetActiveListToAllTasks();
  }

  const sortTasks = (list) => {
    if (!list) return;

    let listCopy = list;
    let temp = [...listCopy['tasks']];
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
    
    listCopy = {...listCopy, tasks: sortedTasks};

    return listCopy;
  };

  const handleSetActiveListToAllTasks = () => {
    const allLists = {
      tasks: []
    }
    
    lists.forEach(list => {
      list.tasks.forEach(task => {
        allLists.tasks.push(task);
      });
    });

    const sortedList = sortTasks(allLists);
    setActiveList(sortedList);
  }

  const handleSetActiveList = (id) => {
    if (!id) return;
    if (id === 'all') {
      handleSetActiveListToAllTasks();
      return;
    }

    const list = lists.find(list => list.id === id);

    if (!list) {
      console.log("Error finding the list to set as active.")
      return;
    }

    setActiveList(sortTasks(list));
  }

  useEffect(() => {
    handleSetActiveListToAllTasks();
  }, [lists])

  // Do this every time activeList changes
  // Update the DOM to show which list item is active on the left
  useEffect(() => {
    if (!activeList) return;

    listRef.current.childNodes.forEach(child => {
      if (!activeList.title) {
        listRef.current.childNodes[0].classList.add('active');
      }

      if (child.dataset.id !== activeList.id) child.classList.remove('active');  
      if (child.dataset.id === activeList.id) child.classList.add('active'); 
    });

  }, [activeList]);

  // Run once to set the task view to all tasks on page load
  useEffect(() => {
    return handleSetActiveListToAllTasks();
  }, []);

  return (
    <ToDoListContext.Provider value={{
      user, setUser, activeList,
      lists, setLists, listRef,
      sortTasks, handleDeleteTask, handleDeleteList,
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleSetActiveList, handleSetActiveListToAllTasks,
      handleShowListForm, handleHideListForm,
      handleSubmitListForm, handleSubmitTaskForm,
      handleShowTaskForm, handleHideTaskForm,
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;

// const setTasksToAllTasks = () => {
//   const allTasks = [];
//    lists.forEach(list => {
//     list.tasks.forEach(task => {
//       allTasks.push(task);
//     });
//   });
//   setTasks(sortTasks(allTasks));
// };

// // This needs fixed.
// // Sets tasks based on the active list
// const handleSetActiveList = (id) => {
//   if (!id) return;
//   if (id === getActiveListID()) return;

//   handleHideTaskForm();
//   handleHideListForm();

//   listRef.current.childNodes.forEach(child => {
//     if (child.dataset.id !== id) child.classList.remove('active');  
//     if (child.dataset.id === id) child.classList.add('active'); 
//   });

//   if (id !== 'all') {
//     const activeList = handleFilterTasks(id);
//     setTasks(sortTasks(activeList.tasks));
//   }

//   // Change this to display the actual tasks once we have those
//   if (id === 'all') setTasksToAllTasks();
// }

// useEffect(() => {
//   console.log("in");
//   setTasksToAllTasks();
// }, []);

// const getActiveListID = () => {
//   if (!listRef || !listRef.current) return;
//   const children = Array.from(listRef.current.children);
//   let active = null;
//   children.forEach(child => {
//     if (child.classList.contains('active')) {
//       active = child.dataset.id;
//     }
//   });
//   return active;
// };

// const handleFilterTasks = (id) => {
//   const listsCopy = [...lists];
//   const filteredList = listsCopy.filter(list => list.id === id);
//   return filteredList[0];
// };
