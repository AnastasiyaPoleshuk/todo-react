import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GetTodoThunk from './store/thunks/GetTodoThunk';
import TodoList from "./components/TodoList/TodoList";
import './App.less';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTodoThunk());
  }, [])

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Your <br /> tasks</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
