import deleteTodo from '../../api/deleteTodo';
import { DeleteTodoAction } from '../actions/todosActions';

/**
 * 
 * @param {string} data 
 */

const DeleteTodoThunk = (data) => {
  return async function (dispatch) {
    const response = await deleteTodo(data);
    dispatch(DeleteTodoAction(response));
  };
};

export default DeleteTodoThunk;