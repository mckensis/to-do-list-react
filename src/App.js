import Header from './components/Header';
import MainSection from './components/MainSection';
import { DataProvider } from './context/ToDoListContext';

function App() {
  return (
    <DataProvider>
      <Header />
      <MainSection />
    </DataProvider>
  );
}

export default App;
