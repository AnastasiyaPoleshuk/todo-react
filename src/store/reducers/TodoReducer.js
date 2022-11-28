import { ADD__TODO, GET__TODOS, DELETE__TODO, EDIT__TODO } from '../actionTypes';
import initialState from '../initialState';


const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD__TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case GET__TODOS:
      return { ...state, todos: action.payload };
    case DELETE__TODO:
      const newTodos = state.todos.filter((todo) => todo.todoId !== action.payload);
      return { ...state, todos: newTodos };
    case EDIT__TODO:
      const oldTodos = state.todos.filter((todo) => todo.todoId !== action.payload.todoId);
      return { ...state, todos: [...oldTodos, action.payload.todo] };
    default:
      return state;
  }
};

export default TodoReducer;
