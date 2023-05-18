import Header from './components/Header';
import Lists from './components/Lists';
import Tasks from './components/Tasks';
import { DataProvider } from './context/ToDoListContext';

function App() {
  return (
    <DataProvider>
      <Header />
      <Lists />
      <Tasks />
    </DataProvider>
  );
}

export default App;
