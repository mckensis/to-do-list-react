import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { handleRetrieveDataFirestore } from "../handles/handleRetrieveDataFirestore";
import { handleCreateListFirestore } from "../handles/handleCreateListFirestore";
// import CreateDefaultList from '../functions/CreateDefaultList';
import handleDeleteListFirestore from "../handles/handleDeleteListFirestore";
import handleCreateTaskFirestore from "../handles/handleCreateTaskFirestore";
import handleDeleteTaskFirestore from "../handles/handleDeleteTaskFirestore";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);

  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [user, setUser] = useState(null);
  const [listSectionVisible, setListSectionVisible] = useState(true);

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

  const handleHideListSection = () => {
    handleHideListForm();
    setListSectionVisible(!listSectionVisible);

    if (!listSectionVisible) {
      if (activeList?.id) return handleSetActiveList(activeList.id);
      handleSetActiveListToAllTasks();
    }
  }

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

  // Add a new list when the user creates one
  const handleAddNewList = async (data) => {
    
    // Add the new list to firestore
    const list = await handleCreateListFirestore(data, user);
    
    // If no other lists exist currently then set this new list as "lists"
    if (!lists) {
      setLists([ list ]);
      return;
    }
    
    // Update "lists" including the new list
    const listsCopy = [...lists, list];
    setLists(listsCopy);
  };

  // Add a new task when the user creates one
  const handleAddNewTask = async (data) => {

    // Find the list to add the task to using list id
    const listCopy = lists.find(list => list.id === data.list);
    
    if (!listCopy) {
      console.log("Error finding the list to add a new task to.")
      return;
    }

    // Add the new task to firestore and then to the list
    const task = await handleCreateTaskFirestore(data, user.id, listCopy.id);
    listCopy.add(task);

    setActiveList(sortTasks(listCopy));
  };

  // Delete the task the user selected
  const handleDeleteTask = async (task) => {

    const listsCopy = [...lists];
    const foundList = listsCopy.find(list => list.id === task.listId);

    if (!foundList) {
      console.log("Error finding the list to delete a task from.");
      return;
    }

    const tasksCopy = [ ...foundList['tasks'] ];
    const updatedTasks = tasksCopy.filter(foundTask => foundTask.id !== task.id);
    foundList.tasks = updatedTasks;

    const updatedLists = listsCopy.map(list => list.id === foundList.id ? list = foundList : list);

    setLists(updatedLists);

    // Do not delete the task from firestore if it's the demo user
    if (user.id === "demo-id") return;
    await handleDeleteTaskFirestore(task.firestoreId);
  };

  // Delete the list the user selected
  const handleDeleteList = async (list) => {
    const updatedLists = [...lists].filter(foundList => foundList.id !== list.id);
  
    if (!updatedLists) {
      console.log("Error finding the list to delete a task from.");
      return;
    }

    await handleDeleteListFirestore(list);

    // Display all tasks as default after deleting a list
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

  // Firebase create a user
  const handleCreateUserThenSignInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      handleSetUser(response.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Firebase Google login popup
  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      handleSetUser(response.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSignInDemo = () => {
    const user = {
      uid: 'demo-id',
      displayName: "Demo User",
      email: "Demo User",
    }
    handleSetUser(user);
  }

  // Set some user information for the app to use once logged in
  const handleSetUser = useCallback((user) => {
    setUser({ id: user.uid, email: user.email, name: user.displayName });
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

  // Retrieve the lists and tasks from firestore
  const retrieveData = useCallback(async () => {
    if (user) {
      try {
        const lists = await handleRetrieveDataFirestore(user.id);
        setLists(lists);
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [user]);

  // Call retrievedata when the user logs in
  useEffect(() => {
    retrieveData();
    return;
  }, [user, retrieveData]);

  // Set the active list to null if there are no lists
  useEffect(() => {
    if (!lists) {
      setActiveList(null);
    } 
  }, [lists]);

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
      handleSetUser, handleSignInDemo,
      listSectionVisible, handleHideListSection,
      handleCreateUserThenSignInWithEmailAndPassword, handleSignInWithGoogle
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;