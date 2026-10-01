import AddTask from './components/Addtask';
import ListTask from './components/ListTask';

export default function App() {
  return (
    <div className="app">
      <h1>✅ My ToDo List</h1>
      <AddTask />
      <ListTask />
    </div>
  );
}