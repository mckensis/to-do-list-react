import Header from './components/Header';
import ListSection from './components/lists/ListSection';
import TaskSection from './components/tasks/TaskSection';
import { DataProvider } from './context/ToDoListContext';

function App() {
  return (
    <DataProvider>
      <Header />
      <ListSection />
      <TaskSection />
    </DataProvider>
  );
}

export default App;
