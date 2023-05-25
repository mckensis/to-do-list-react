import { createContext, useCallback, useEffect, useRef, useState } from "react";
import CreateDefaultList from '../functions/CreateDefaultList';
import List from "../classes/List";
import { auth, googleProvider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

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
    if (!lists) {
      setLists([newList]);
      return;
    }
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
  }

  // Sort all tasks in the collection of all lists
  const sortLists = (lists) => {
    const sortedLists = lists.map(list => sortTasks(list));
    return sortedLists;
  }

  // Sort the tasks within one list
  const sortTasks = (list) => {
    if (!list) return;

    let listCopy = list;
    let tasksCopy = [...listCopy['tasks']];

    const sortedTasks = tasksCopy.sort(function(first, second) {
      
      // Sort by task completion
      // Completed tasks will be sorted at the bottom
      if (first.isComplete() < second.isComplete()) return -1;
      if (second.isComplete() < first.isComplete()) return 1;
      
      // Sort by due date
      // Overdue tasks will be at the top
      if (first.isComplete() && second.isComplete()) {
        if (first.due < second.due) return 1;
        if (second.due < first.due) return -1;
      }
      
      // Sort by due date for incomplete tasks
      // New tasks will be placed at the top of the list
      if (!first.isComplete() && !second.isComplete()) {
        if (second.due < first.due) return 1;
        if (first.due < second.due) return -1;
      }

      // Sort by priority for completed tasks due on the same day
      // Urgent priority will be sorted higher
      // Low priority will be sorted lower
      if (first.isComplete() && second.isComplete()) {
        if (first.priority < second.priority) return 1;
        if (second.priority < first.priority) return -1;
      }

      return 1;
    });
    
    listCopy = {...listCopy, tasks: sortedTasks};

    return listCopy;
  };

  const handleCreateUserThenSignInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      handleSetUser(response.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      handleSetUser(response.user);
    } catch (err) {
      console.log(err.message);
    }
  }
  
  const handleSignOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSetUser = useCallback((user) => {
    setUser({ id: user.uid, email: user.email, photo: user.photoURL, name: user.displayName });
  }, [setUser]);

  // For displaying "All Tasks" to the user
  const handleSetActiveListToAllTasks = useCallback(() => {
    const allLists = {
      tasks: []
    }
    
    lists?.forEach(list => {
      list.tasks.forEach(task => {
        allLists.tasks.push(task);
      });
    });

    const sortedList = sortTasks(allLists);
    setActiveList(sortedList);
  }, [lists]);

  // Filters the active list to the list which was clicked on in the left section
  const handleSetActiveList = useCallback((id) => {
    if (!id) return;
    if (id === 'all') {
      handleSetActiveListToAllTasks();
      return;
    }

    const list = lists.find(list => list.id === id);

    if (!list) {
      console.log("Error finding the list to set as active.");
      return;
    }

    // Set the active list to the list which was clicked on
    setActiveList(sortTasks(list));
  }, [handleSetActiveListToAllTasks, lists]);

  // Do this when the lists variable changes
  useEffect(() => {
    if (!activeList?.id) handleSetActiveListToAllTasks();
    if (activeList?.id) handleSetActiveList(activeList.id);
  }, [lists, activeList?.id, handleSetActiveList, handleSetActiveListToAllTasks]);

  // Do this every time activeList changes
  // Update the DOM to show which list item is active on the left
  useEffect(() => {
    if (!activeList) return;
    if (!listRef?.current?.childNodes) return;

    listRef.current.childNodes.forEach(child => {
      if (!activeList.title) {
        listRef.current.childNodes[0].classList.add('active');
      }

      if (child.dataset.id !== activeList.id) child.classList.remove('active');  
      if (child.dataset.id === activeList.id) child.classList.add('active'); 
    });

  }, [activeList]);

  useEffect(() => {
    setLists(null);
  }, [user]);

  return (
    <ToDoListContext.Provider value={{
      user, setUser, activeList,
      lists, setLists, listRef,
      sortLists, sortTasks,
      handleDeleteTask, handleDeleteList,
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleSetActiveList, handleSetActiveListToAllTasks,
      handleShowListForm, handleHideListForm,
      handleSubmitListForm, handleSubmitTaskForm,
      handleShowTaskForm, handleHideTaskForm,
      handleSetUser,
      handleCreateUserThenSignInWithEmailAndPassword, handleSignInWithGoogle, handleSignOutUser
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;