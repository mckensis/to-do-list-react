import { createContext, useState } from "react";

// Create a context for the site to use
const ToDoListContext = createContext({});

// Provider to give access to functions and variables required by components
export const DataProvider = ({ children }) => {

  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [listFormVisible, setListFormVisible] = useState(false);

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
  // Put states here
  // Put functions here

  return (
    <ToDoListContext.Provider value={{
      // put variables, functions, states, etc. here
      taskFormVisible, setTaskFormVisible,
      listFormVisible, setListFormVisible,
      handleShowListForm, handleHideListForm,
      handleShowTaskForm, handleHideTaskForm
    }}>
      {children}
    </ToDoListContext.Provider>
  )
}

export default ToDoListContext;