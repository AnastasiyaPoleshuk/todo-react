import addTodo from '../../api/addTodo';
import { AddTodoAction } from '../actions/todosActions';

/**
 * 
 * @param {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; }} data 
 */

const AddTodoThunk = (data) => {
  return async function (dispatch) {
    const response = await addTodo(data);
    dispatch(AddTodoAction(response));
  };
};

export default AddTodoThunk;