import { useContext } from 'react';
import ToDoListContext from '../context/ToDoListContext';
import ListSection from './lists/ListSection';
import TaskSection from './tasks/TaskSection';
import Login from './user/Login';

const MainSection = () => {

  const { user } = useContext(ToDoListContext);

  return (
    <main>
      {!user && 
        <Login />
      }
      {user && <>
        <ListSection />
        <TaskSection />
      </>}
    </main>
  )
}

export default MainSection;