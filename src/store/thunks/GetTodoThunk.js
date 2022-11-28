import getTodos from '../../api/getTodos';
import { GetTodosAction } from '../actions/todosActions';

const GetTodoThunk = () => {
  return async function (dispatch) {
    const response = await getTodos();
    dispatch(GetTodosAction(response));
  };
};

export default GetTodoThunk;