import { useSelector } from 'react-redux';
import './assets/todo.css';
import TodoPage from './features/main/TodoPage';


export function App() {
  const value = useSelector((state) => state.todo);
  console.log(value);

  return (
    <div className="container">
      <div className="container__app">
        <TodoPage/>
      </div>
    </div>
  );
}

export default App;
